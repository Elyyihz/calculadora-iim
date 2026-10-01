from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import diagnosticos


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Inicializa as tabelas da base de dados na inicialização
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="UrbanFlow - API de Diagnóstico IIM",
    description=(
        "API RESTful para suporte à consultoria de mobilidade urbana corporativa. "
        "Permite recepção, validação e persistência dos diagnósticos da Calculadora IIM, "
        "além de fornecer endpoints para extrações estatísticas e benchmarking setorial."
    ),
    version="1.0.0",
    lifespan=lifespan
)

# Configuração de CORS para permitir integração com a aplicação web React/Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão dos roteadores da API
app.include_router(diagnosticos.router)


@app.get("/", tags=["Status"])
def root():
    return {
        "sistema": "UrbanFlow Consultoria - API IIM",
        "versao": "1.0.0",
        "status": "online",
        "documentacao": "/docs",
        "endpoints_principais": {
            "salvar_diagnostico": "POST /api/diagnosticos",
            "listar_diagnosticos": "GET /api/diagnosticos",
            "obter_diagnostico": "GET /api/diagnosticos/{id}",
            "estatisticas_consultoria": "GET /api/estatisticas"
        }
    }


@app.get("/health", tags=["Status"])
def health_check():
    return {"status": "ok", "servico": "calculadora-iim-api"}
