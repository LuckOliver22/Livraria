import React, { useState } from "react";
import { useCart, useAuth } from "../App";
import { api } from "../api";

export default function Cart({ onOrderPlaced }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, i) => sum + i.book.price * i.quantity, 0);

  const handleOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const items = cart.map(i => ({ book_id: i.book_id, quantity: i.quantity }));
      const order = await api.createOrder(user.username, items);
      setSuccess(order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="success-wrap">
      <div className="success-card">
        <h2>✅ Pedido #{success.id} confirmado!</h2>
        <p>Total: <strong>R$ {success.total.toFixed(2)}</strong></p>
        <button onClick={onOrderPlaced}>Ver meus pedidos</button>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="empty-cart">
      <p>🛒 Seu carrinho está vazio.</p>
    </div>
  );

  return (
    <div className="cart-wrap">
      <h2>Carrinho</h2>
      {error && <div className="error-msg">{error}</div>}
      {cart.map(item => (
        <div className="cart-item" key={item.book_id}>
          <div>
            <strong>{item.book.title}</strong>
            <span> — {item.quantity}x — R$ {(item.book.price * item.quantity).toFixed(2)}</span>
          </div>
          <button className="remove-btn" onClick={() => removeFromCart(item.book_id)}>✕</button>
        </div>
      ))}
      <div className="cart-total">
        <span>Total</span>
        <strong>R$ {total.toFixed(2)}</strong>
      </div>
      <button className="checkout-btn" onClick={handleOrder} disabled={loading}>
        {loading ? "Processando..." : "Finalizar pedido"}
      </button>
    </div>
  );
}
