from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

# ── Modelos ──────────────────────────────────────────────
class Book(BaseModel):
    id: int
    title: str
    author: str
    price: float
    stock: int
    cover_url: str = ""
    genre: str = ""

class OrderItem(BaseModel):
    book_id: int
    quantity: int

class Order(BaseModel):
    id: int
    user: str
    items: List[OrderItem]
    total: float
    status: str = "pending"
    created_at: str = datetime.now().isoformat()

class User(BaseModel):
    username: str
    password: str

# ── Banco em memória ──────────────────────────────────────
books_db: List[Book] = [
    Book(id=1, title="O Senhor dos Anéis", author="J.R.R. Tolkien", price=89.90, stock=15, genre="Fantasia",
         cover_url="https://covers.openlibrary.org/b/id/8743748-M.jpg"),
    Book(id=2, title="1984", author="George Orwell", price=49.90, stock=30, genre="Distopia",
         cover_url="https://covers.openlibrary.org/b/id/8575708-M.jpg"),
    Book(id=3, title="Dom Casmurro", author="Machado de Assis", price=29.90, stock=50, genre="Literatura Brasileira",
         cover_url="https://covers.openlibrary.org/b/id/240726-M.jpg"),
    Book(id=4, title="O Pequeno Príncipe", author="Antoine de Saint-Exupéry", price=34.90, stock=40, genre="Clássico",
         cover_url="https://covers.openlibrary.org/b/id/8479576-M.jpg"),
    Book(id=5, title="Sapiens", author="Yuval Noah Harari", price=59.90, stock=20, genre="História",
         cover_url="https://covers.openlibrary.org/b/id/8739161-M.jpg"),
    Book(id=6, title="A Revolução dos Bichos", author="George Orwell", price=39.90, stock=25, genre="Distopia",
         cover_url="https://covers.openlibrary.org/b/id/8224056-M.jpg"),
]

orders_db: List[Order] = []
users_db: List[User] = [User(username="admin", password="1234")]
order_counter = {"value": 1}
