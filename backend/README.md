# UrbanFlow — API RESTful de Diagnóstico IIM

API construída em **FastAPI** e **SQLAlchemy** para persistência, auditoria e inteligência estatística dos diagnósticos da **Calculadora de Índice de Impacto de Mobilidade (IIM v3.0)**.

---

## 🚀 Arquitetura e Estrutura

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Ponto de entrada FastAPI, CORS e Lifespan
│   ├── database.py             # Configuração da engine SQLite e SessionLocal
│   ├── models.py               # Modelo relacional SQLAlchemy (DiagnosticoIIM)
│   ├── schemas.py              # DTOs Pydantic (Validação e Serialização)
│   └── routers/
│       ├── __init__.py
│       └── diagnosticos.py     # Endpoints CRUD e extração de estatísticas
├── tests/
│   ├── __init__.py
│   └── test_api.py             # Bateria de testes automatizados (unittest + TestClient)
├── requirements.txt            # Dependências Python
└── README.md
```

---

## 📦 Instalação

No diretório do projeto ou dentro da pasta `backend`:

```bash
cd backend
pip install -r requirements.txt
```

Dependências principais:
- `fastapi`
- `uvicorn`
- `sqlalchemy`
- `pydantic`

---

## ▶️ Como Executar a API

Inicie o servidor de desenvolvimento na porta `8000`:

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

A API estará disponível em:
- **Root / Informações**: `http://localhost:8000/`
- **Documentação Interativa Swagger UI**: `http://localhost:8000/docs`
- **Documentação ReDoc**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/health`

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/diagnosticos` | Recebe as respostas da calculadora + IIM calculado e persiste na base |
| `GET` | `/api/diagnosticos` | Lista diagnósticos armazenados com paginação (`skip`, `limit`) e filtros |
| `GET` | `/api/diagnosticos/{id}` | Retorna os detalhes de um diagnóstico específico |
| `DELETE` | `/api/diagnosticos/{id}` | Remove um diagnóstico por ID |
| `GET` | `/api/estatisticas` | **Inteligência estatística agregada** para consultoria e benchmarking setorial |

### Exemplo de Payload para `POST /api/diagnosticos`:

```json
{
  "respostas": {
    "empresa_nome": "Logística & Cia",
    "empresa_setor": "logistica",
    "empresa_regime": "presencial",
    "empresa_total": 250,
    "empresa_presencial_qtd": 200,
    "d1_tempo": 85,
    "d1_dist": 28,
    "d1_modal": "onibus",
    "d2_estresse": 3,
    "d3_atrasos": 4,
    "d4_seg": 3
  },
  "resultado": {
    "iim": 71.4,
    "classificacao": "Crítico",
    "dimensoes": {
      "d1Norm": 78.5,
      "d2Norm": 65.0,
      "d3Norm": 70.0,
      "d4Norm": 72.0
    },
    "financeiro": {
      "custoImpactoTotalMensal": 3420.50
    },
    "projecaoEmpresa": {
      "impactoEmpresaAnual": 4104600.00
    }
  }
}
```

---

## 📊 Extração de Estatísticas (`GET /api/estatisticas`)

Permite obter em tempo real:
- **IIM Médio Geral** de todas as empresas diagnosticadas.
- **Distribuição de Risco**: contagem por faixa (*Baixo*, *Moderado*, *Alto*, *Crítico*).
- **Médias Normalizadas por Dimensão**: D1 (Trajeto), D2 (Estresse), D3 (Pontualidade), D4 (Vulnerabilidade).
- **Tempo e Distância Médios** de deslocamento urbano dos colaboradores.
- **Modais mais Utilizados** (ônibus, metrô, carro, moto, bicicleta, a pé, etc.).
- **Benchmarking por Setor Econômico**: comparativo de IIM médio e custo financeiro por setor.
- **Impacto Financeiro Acumulado**: soma total das perdas mensais e anuais identificadas.

---

## 🧪 Testes Automatizados

Para executar os testes de integração e validação da API:

```bash
python3 -m unittest backend/tests/test_api.py
```
