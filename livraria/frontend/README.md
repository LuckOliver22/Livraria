# Livraria — Front-end (React)

## Rodar localmente

```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:8000 npm start
```

App disponível em: http://localhost:3000

## Configurar URL do back-end

Crie um arquivo `.env` na raiz do `frontend/`:

```
REACT_APP_API_URL=https://SEU-BACKEND.railway.app
```

## Deploy no Vercel (recomendado)

1. Crie conta em https://vercel.com
2. Import Git Repository → selecione seu repositório
3. Root directory: `frontend`
4. Framework Preset: Create React App
5. Environment Variables: adicione `REACT_APP_API_URL` com a URL do back-end
6. Deploy!

## Deploy no Netlify

1. Crie conta em https://netlify.com
2. Add new site → Import from Git
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `frontend/build`
6. Environment Variables: adicione `REACT_APP_API_URL`
7. Deploy!

## Estrutura

```
src/
├── App.js          # Shell principal + contextos (Auth, Cart)
├── App.css         # Estilos globais
├── api.js          # Camada de comunicação com o back-end
├── index.js        # Entrada React
└── pages/
    ├── Login.js    # Login e cadastro
    ├── Catalog.js  # Listagem de livros com busca e filtro
    ├── Cart.js     # Carrinho e finalização de pedido
    └── Orders.js   # Histórico de pedidos
```
