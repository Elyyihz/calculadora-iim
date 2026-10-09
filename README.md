# UrbanFlow Consultoria & Calculadora IIM

Plataforma web institucional e analítica da **UrbanFlow Consultoria**, especializada em eficiência de mobilidade corporativa, sustentabilidade ESG e quantificação do **Índice de Impacto de Mobilidade (IIM)**.

Desenvolvido com arquitetura moderna baseada em componentes (**React + TypeScript + Vite + React Router**), totalmente responsivo e utilizando o mesmo sistema de design tokens (variáveis CSS) da ferramenta proprietária `calculadora-iim-v3.1-1.html`.

---

## 🎨 Identidade Visual & Design Tokens (Variáveis CSS)

O projeto herda rigorosamente as variáveis CSS definidas em `calculadora-iim-v3.1-1.html` através do ficheiro [`src/styles/variables.css`](file:///Users/elyyihz/repositories/personal/calculadora-iim/src/styles/variables.css):

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

## 🏛️ Estrutura de Componentes

```text
src/
├── styles/
│   ├── variables.css           # Tokens de design idênticos ao HTML original
│   └── global.css              # Reset, tipografia, botões e utilitários
├── types/
│   └── index.ts                # Modelos de dados TypeScript (membros, métricas, etc.)
├── data/
│   └── institutionalData.ts    # Dados das 4 secções institucionais e métricas
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Cabeçalho fixo com navegação responsiva e menu mobile
│   │   ├── Footer.tsx          # Rodapé institucional com links e contactos
│   │   └── Layout.tsx          # Shell estrutural com Outlet do React Router
│   ├── common/
│   │   └── SectionTitle.tsx    # Cabeçalhos padronizados de secção
│   └── home/
│       ├── HeroSection.tsx     # Secção 'Início' com propostas de valor e métricas
│       ├── QuemSomosSection.tsx# Secção 'Quem Somos' com missão, visão e pilares
│       ├── EquipaSection.tsx   # Secção 'A Equipa' com cards dos especialistas
│       ├── ResponsabilidadesSection.tsx # Secção 'Responsabilidades' (ESG, Social, Governança)
│       └── CtaBanner.tsx       # Transição e convite à Calculadora IIM
├── pages/
│   ├── HomePage.tsx            # Página institucional unificada (Início, Quem Somos, Equipa, Responsabilidades)
│   ├── QuemSomosPage.tsx       # Rota dedicada /quem-somos
│   ├── EquipaPage.tsx          # Rota dedicada /a-equipa
│   ├── ResponsabilidadesPage.tsx # Rota dedicada /responsabilidades
│   ├── CalculadoraPage.tsx     # Rota da Calculadora /calculadora (com visão arquitetural e protótipo)
│   └── NotFoundPage.tsx        # Página de erro 404
├── routes/
│   └── index.tsx               # Configuração centralizada de rotas React Router
├── App.tsx                     # Provedor BrowserRouter e raiz da aplicação
└── main.tsx                    # Ponto de entrada React 18
```

---

## 🧭 Roteamento (Routing)

O sistema de rotas foi configurado para permitir navegação contínua entre o conteúdo institucional e a ferramenta de cálculo:

- `/` → **Site Institucional** completo contendo as secções **'Início'**, **'Quem Somos'**, **'A Equipa'** e **'Responsabilidades'**.
- `/#quem-somos`, `/#a-equipa`, `/#responsabilidades` → Suporte a âncoras suaves com rolagem automática.
- `/quem-somos` → Página dedicada de apresentação institucional.
- `/a-equipa` → Página dedicada da equipa de consultores e especialistas.
- `/responsabilidades` → Página dedicada aos compromissos ESG, sociais e de governança.
- `/calculadora` → **Rota dedicada à Calculadora IIM**, com blueprint das 4 etapas de diagnóstico e executor do protótipo interativo.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ (testado e compatível até Node 25)
- npm ou yarn

### Instalação
```bash
npm install
```

### Modo de Desenvolvimento
```bash
npm run dev
```
O servidor de desenvolvimento iniciará em `http://localhost:3000`.

### Build de Produção
```bash
npm run build
```
Os ficheiros otimizados serão gerados na pasta `dist/`.

### Pré-visualização da Build
```bash
npm run preview
```

---

## 🐍 Backend API RESTful (FastAPI + SQLAlchemy)

O projeto conta com um backend Python para suportar a consultoria corporativa e viabilizar extrações estatísticas de mobilidade:

### Instalação e Execução da API
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- **Swagger Interativo**: `http://localhost:8000/docs`
- **Endpoints Principais**:
  - `POST /api/diagnosticos`: Persistência de respostas e resultados calculados
  - `GET /api/diagnosticos`: Listagem de diagnósticos com filtros por setor/faixa
  - `GET /api/diagnosticos/{id}`: Obtenção de diagnóstico por ID
  - `GET /api/estatisticas`: Inteligência estatística agregada (médias, benchmark setorial, dispersão de modais)

### Testes do Backend
```bash
python3 -m unittest backend/tests/test_api.py
```