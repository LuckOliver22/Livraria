# Livraria — Back-end (FastAPI)

## Rodar localmente

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API disponível em: http://localhost:8000  
Docs automáticas: http://localhost:8000/docs

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Health check |
| POST | /auth/login | Login |
| POST | /auth/register | Cadastro |
| GET | /books/ | Listar livros (query: genre, search) |
| GET | /books/{id} | Detalhe do livro |
| GET | /books/genres/all | Listar gêneros |
| POST | /orders/ | Criar pedido |
| GET | /orders/ | Listar pedidos (query: user) |
| GET | /orders/{id} | Detalhe do pedido |

## Função de teste (Exercício 8.4)

```python
import requests

BASE_URL = "https://SEU-BACKEND.railway.app"  # troque pela URL do deploy

def test_backend():
    print("1. Health check...")
    r = requests.get(f"{BASE_URL}/health")
    assert r.status_code == 200
    print("   ✓", r.json())

    print("2. Login...")
    r = requests.post(f"{BASE_URL}/auth/login", json={"username": "admin", "password": "1234"})
    assert r.status_code == 200
    print("   ✓", r.json())

    print("3. Listar livros...")
    r = requests.get(f"{BASE_URL}/books/")
    assert r.status_code == 200
    livros = r.json()
    print(f"   ✓ {len(livros)} livros encontrados")

    print("4. Buscar livro...")
    r = requests.get(f"{BASE_URL}/books/?search=1984")
    assert r.status_code == 200
    print("   ✓", r.json()[0]["title"])

    print("5. Criar pedido...")
    r = requests.post(f"{BASE_URL}/orders/", json={
        "user": "admin",
        "items": [{"book_id": 1, "quantity": 1}]
    })
    assert r.status_code == 200
    print("   ✓ Pedido criado:", r.json())

    print("\n✅ Todos os testes passaram!")

if __name__ == "__main__":
    test_backend()
```

## Deploy no Railway

1. Crie conta em https://railway.app
2. New Project → Deploy from GitHub repo
3. Aponte para a pasta `backend/`
4. Railway detecta o `Procfile` automaticamente
5. Copie a URL gerada

## Deploy no Render

1. Crie conta em https://render.com
2. New Web Service → conecte o repositório
3. Root directory: `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
