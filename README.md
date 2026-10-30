# UrbanFlow Consultoria & Calculadora IIM

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p>Plataforma web analítica e institucional de alta performance para eficiência em mobilidade corporativa, sustentabilidade ESG e quantificação do <b>Índice de Impacto de Mobilidade (IIM)</b>.</p>

</div>

---

## 📖 Visão Geral

A **UrbanFlow Consultoria & Calculadora IIM** é uma solução corporativa full-stack projetada para mensurar os impactos de deslocamento urbano de colaboradores, calcular pegadas de carbono equivalentes e gerar relatórios executivos para estratégias ESG.

A aplicação combina um frontend reativo moderno construído em **React + TypeScript + Vite** com um backend analítico em **FastAPI + SQLite/SQLAlchemy**, permitindo simulações interativas, ingestão em lote e visualização estatística de dados de transporte.

---

## 🎨 Identidade Visual & Design Tokens

O projeto adota uma biblioteca coesa de tokens de design via CSS variables ([`src/styles/variables.css`](file:///Users/elyyihz/repositories/personal/calculadora-iim/src/styles/variables.css)):

| Variável | Valor | Aplicação |
| :--- | :--- | :--- |
| `--brand` | `#0D2B1F` | Fundo principal dos headers, heróis e rodapé (Verde Escuro Floresta) |
| `--brand-mid` | `#1A4A35` | Gradientes e destaques secundários |
| `--accent` | `#2ECC8A` | Cor de destaque primária e botões CTA (Verde Esmeralda) |
| `--accent-light`| `#E8FBF3` | Fundos de cards e badges ativas |
| `--accent-mid` | `#A8EDD2` | Bordas e realces sutis |
| `--surface` | `#FFFFFF` | Superfície de cartões e inputs |
| `--surface-2` | `#F4F9F7` | Fundo base da aplicação |
| `--surface-3` | `#EBF4F0` | Trilhas de progresso e separadores |
| `--text` | `#0D2B1F` | Tipografia principal |
| `--text-muted` | `#5A7568` | Texto secundário |
| `--text-faint` | `#9BB5A8` | Legendas e rótulos auxiliares |
| `--warn` | `#cc3333` | Alertas e validação |

**Tipografia:**
- Títulos e Destaques: `Syne` (Google Fonts)
- Corpo de Texto: `DM Sans` (Google Fonts)

---

## 🏛️ Estrutura Arquitetural

```text
calculadora-iim/
├── backend/
│   ├── app/
│   │   ├── main.py              # Ponto de entrada FastAPI e injeção de rotas
│   │   ├── models.py            # Modelos relacionais ORM (SQLAlchemy)
│   │   ├── schemas.py           # Contratos e validações Pydantic
│   │   └── database.py          # Gerenciamento de sessões de banco de dados
│   ├── tests/                   # Bateria de testes automatizados unitários
│   ├── Dockerfile               # Containerização de microsserviço Python
│   └── requirements.txt         # Dependências do backend
├── src/
│   ├── styles/                  # Design tokens e folhas de estilo globais
│   ├── types/                   # Contratos de tipos TypeScript
│   ├── data/                    # Dados estáticos institucionais e métricas
│   ├── components/              # Componentes React modulares e acessíveis
│   │   ├── layout/              # Header, Footer, Layout Shell
│   │   ├── common/              # SectionTitle, Badges, Modais
│   │   └── home/                # Seções da landing page e diagnóstico
│   ├── pages/                   # Telas de roteamento (Home, Calculadora, etc.)
│   └── routes/                  # Configuração declarativa de rotas
├── docker-compose.yml           # Orquestração local completa (Frontend + Backend)
├── Dockerfile                   # Build multi-stage Node/Nginx
├── nginx.conf                   # Proxy reverso e roteamento SPA Nginx
└── package.json                 # Metadados do ecossistema Node.js
```

---

## 🧭 Roteamento & Navegação

- `/` → **Landing Page Institucional** (Visão Executiva, Metodologia, Equipe, Pilares ESG).
- `/#quem-somos`, `/#a-equipa`, `/#responsabilidades` → Suporte a âncoras suaves com scroll adaptativo.
- `/calculadora` → **Calculadora IIM Interativa**, com formulário em 4 etapas, importação de planilhas CSV/XLSX e exibição imediata do score de impacto.

---

## 🐳 Execução via Docker (Recomendado)

O projeto possui suporte nativo a Docker Compose para inicializar tanto a interface quanto o backend analítico com um único comando:

```bash
# Inicialização e build de todos os containers
docker compose up --build -d

# Visualização de logs
docker compose logs -f
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **Documentação OpenAPI / Swagger:** [http://localhost:8000/docs](http://localhost:8000/docs)

Para encerrar os serviços:
```bash
docker compose down
```

---

## 💻 Execução Local sem Docker

### Frontend (React + Vite)
```bash
# Instalação das dependências
npm install

# Inicialização em modo desenvolvimento (HMR ativo)
npm run dev
```

### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 🧪 Testes Automatizados

```bash
# Execução da suíte de testes de integração e endpoints
python3 -m unittest backend/tests/test_api.py
```

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.
