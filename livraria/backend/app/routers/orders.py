from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from app.database import books_db, orders_db, Order, OrderItem, order_counter

router = APIRouter()

class CreateOrderRequest(BaseModel):
    user: str
    items: List[OrderItem]

@router.post("/", response_model=Order)
def create_order(req: CreateOrderRequest):
    total = 0.0
    for item in req.items:
        book = next((b for b in books_db if b.id == item.book_id), None)
        if not book:
            raise HTTPException(status_code=404, detail=f"Livro {item.book_id} não encontrado")
        if book.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Estoque insuficiente para '{book.title}'")
        total += book.price * item.quantity
        book.stock -= item.quantity

    order = Order(
        id=order_counter["value"],
        user=req.user,
        items=req.items,
        total=round(total, 2),
        status="confirmed"
    )
    order_counter["value"] += 1
    orders_db.append(order)
    return order

@router.get("/", response_model=List[Order])
def list_orders(user: str = None):
    if user:
        return [o for o in orders_db if o.user == user]
    return orders_db

@router.get("/{order_id}", response_model=Order)
def get_order(order_id: int):
    order = next((o for o in orders_db if o.id == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return order
