from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import books, orders, auth

app = FastAPI(title="Livraria API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(books.router, prefix="/books", tags=["books"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])

@app.get("/")
def root():
    return {"status": "ok", "message": "Livraria API funcionando"}

@app.get("/health")
def health():
    return {"status": "healthy"}
