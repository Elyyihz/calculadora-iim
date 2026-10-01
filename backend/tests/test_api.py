import os
import sys
import unittest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Adiciona o diretório do backend ao sys.path para importações
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from app.main import app

# Configura banco de dados em memória exclusivo para testes compartilhando a mesma conexão
TEST_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


class TestCalculadoraIIMAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        Base.metadata.create_all(bind=test_engine)
        cls.client = TestClient(app)

    @classmethod
    def tearDownClass(cls):
        Base.metadata.drop_all(bind=test_engine)

    def test_01_health_and_root(self):
        resp_root = self.client.get("/")
        self.assertEqual(resp_root.status_code, 200)
        self.assertIn("sistema", resp_root.json())

        resp_health = self.client.get("/health")
        self.assertEqual(resp_health.status_code, 200)
        self.assertEqual(resp_health.json()["status"], "ok")

    def test_02_criar_diagnostico_sucesso(self):
        payload = {
            "respostas": {
                "empresa_nome": "Tech Mobility Solutions",
                "empresa_setor": "tecnologia",
                "empresa_regime": "hibrido",
                "empresa_contrato": "clt",
                "empresa_flex": "sim",
                "empresa_turno": "diurno",
                "empresa_local": "centro",
                "empresa_total": 120,
                "empresa_presencial_qtd": 80,
                "empresa_turnover": 18.5,
                "empresa_burnout": 6.0,
                "empresa_faturamento": 15000000,
                "empresa_salario_medio": 8500,
                "empresa_beneficios": "vt_extra",
                "empresa_ciclista": "sim",
                "func_cargo": "analitico",
                "func_presenca": "parcial",
                "func_salario": 7500,
                "func_reposicao": 1.5,
                "d1_tempo": 75,
                "d1_dist": 22,
                "d1_modal": "onibus",
                "d1_dias": 3,
                "d1_bald": 2,
                "d1_espera": 20,
                "d1_variacao": 15,
                "d1_custo": 440,
                "d1_vt": "sim",
                "d2_cansaco": 3,
                "d2_estresse": 3,
                "d2_conc": 2,
                "d2_qual": 2,
                "d2_sono": 2,
                "d2_desconforto": 2,
                "d2_lazer": 2,
                "d2_ansiedade": 3,
                "d2_energia": 2,
                "d3_atrasos": 4,
                "d3_faltas": 1,
                "d3_recusa": 0,
                "d3_licencas": 0,
                "d3_contrib": 3,
                "d3_homeoff": 2,
                "d3_limite": 2,
                "d3_saicedo": 1,
                "d3_intencao": 3,
                "d4_bairro": "Zona Leste",
                "d4_ponto": 12,
                "d4_dep": 3,
                "d4_seg": 3,
                "d4_app": 1,
                "d4_risco": 1,
                "d4_violencia": 2,
                "d4_vuln": 3,
                "d4_tp_qual": 3
            },
            "resultado": {
                "iim": 64.2,
                "classificacao": "Alto",
                "dimensoes": {
                    "d1Raw": 68.0,
                    "d1Norm": 72.0,
                    "d2Raw": 62.0,
                    "d2Norm": 65.0,
                    "d3Raw": 55.0,
                    "d3Norm": 58.0,
                    "d4Raw": 60.0,
                    "d4Norm": 62.0
                },
                "financeiro": {
                    "custoBrutoMensal": 660.0,
                    "perdaProdutividadeMensal": 1450.0,
                    "presenteismoMensal": 725.0,
                    "custoTurnoverReposicao": 11250.0,
                    "custoImpactoTotalMensal": 2835.0
                },
                "projecaoEmpresa": {
                    "totalPresencial": 80,
                    "impactoEmpresaMensal": 226800.0,
                    "impactoEmpresaAnual": 2721600.0,
                    "faturamentoAnual": 15000000.0,
                    "percentualFaturamento": "18.14"
                }
            }
        }

        resp = self.client.post("/api/diagnosticos", json=payload)
        self.assertEqual(resp.status_code, 201)
        data = resp.json()
        self.assertIn("id", data)
        self.assertEqual(data["empresa_nome"], "Tech Mobility Solutions")
        self.assertEqual(data["empresa_setor"], "tecnologia")
        self.assertEqual(data["iim_score"], 64.2)
        self.assertEqual(data["iim_classificacao"], "Alto")
        self.assertEqual(data["d1_score_norm"], 72.0)

    def test_03_listar_e_obter_por_id(self):
        resp_list = self.client.get("/api/diagnosticos")
        self.assertEqual(resp_list.status_code, 200)
        items = resp_list.json()
        self.assertGreaterEqual(len(items), 1)

        diag_id = items[0]["id"]
        resp_item = self.client.get(f"/api/diagnosticos/{diag_id}")
        self.assertEqual(resp_item.status_code, 200)
        self.assertEqual(resp_item.json()["id"], diag_id)

    def test_04_extrair_estatisticas(self):
        resp_stats = self.client.get("/api/estatisticas")
        self.assertEqual(resp_stats.status_code, 200)
        stats = resp_stats.json()

        self.assertGreaterEqual(stats["total_diagnosticos"], 1)
        self.assertGreater(stats["iim_medio_geral"], 0)
        self.assertIn("Alto", stats["distribuicao_classificacao"])
        self.assertIn("D1", stats["media_dimensoes_normalizadas"])
        self.assertGreater(len(stats["estatisticas_por_setor"]), 0)
        self.assertGreater(stats["tempo_medio_trajeto_minutos"], 0)

    def test_05_filtros_e_erros_404(self):
        # Filtro com resultado
        resp_filtro = self.client.get("/api/diagnosticos?setor=tecnologia&classificacao=Alto")
        self.assertEqual(resp_filtro.status_code, 200)
        self.assertGreaterEqual(len(resp_filtro.json()), 1)

        # Filtro sem resultado
        resp_vazio = self.client.get("/api/diagnosticos?setor=agronegocio")
        self.assertEqual(resp_vazio.status_code, 200)
        self.assertEqual(len(resp_vazio.json()), 0)

        # 404 para ID inexistente
        resp_404 = self.client.get("/api/diagnosticos/99999")
        self.assertEqual(resp_404.status_code, 404)

    def test_06_deletar_diagnostico(self):
        # Cria um para deletar
        payload = {
            "respostas": {
                "empresa_nome": "Empresa Temporária",
                "empresa_setor": "varejo",
                "empresa_regime": "presencial"
            },
            "resultado": {
                "iim": 45.0,
                "classificacao": "Moderado"
            }
        }
        resp = self.client.post("/api/diagnosticos", json=payload)
        self.assertEqual(resp.status_code, 201)
        temp_id = resp.json()["id"]

        # Deleta
        del_resp = self.client.delete(f"/api/diagnosticos/{temp_id}")
        self.assertEqual(del_resp.status_code, 204)

        # Verifica se realmente sumiu
        check_resp = self.client.get(f"/api/diagnosticos/{temp_id}")
        self.assertEqual(check_resp.status_code, 404)


if __name__ == "__main__":
    unittest.main()
