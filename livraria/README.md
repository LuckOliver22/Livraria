# Livraria — Arquitetura Cliente-Servidor

Projeto completo para os exercícios 8.3 e 8.4 de Engenharia de Software.

## Estrutura do repositório

```
livraria/
├── backend/          # FastAPI (Python)
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   └── routers/
│   │       ├── auth.py
│   │       ├── books.py
│   │       └── orders.py
│   ├── requirements.txt
│   ├── Procfile
│   └── README.md
└── frontend/         # React
    ├── src/
    │   ├── App.js
    │   ├── api.js
    │   └── pages/
    │       ├── Login.js
    │       ├── Catalog.js
    │       ├── Cart.js
    │       └── Orders.js
    ├── package.json
    └── README.md
```

## Rodar localmente (ambos juntos)

Terminal 1 — Back-end:
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Terminal 2 — Front-end:
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:8000 npm start
```

## Deploy

| Serviço | Plataforma | Docs |
|---------|-----------|------|
| Back-end | Railway ou Render | `backend/README.md` |
| Front-end | Vercel ou Netlify | `frontend/README.md` |

## Função de teste (Exercício 8.4)

```bash
pip install requests
python backend/README.md  # copie e execute o script de teste
```

Ou acesse: `https://SEU-BACKEND.railway.app/docs` — Swagger UI automático do FastAPI.
