import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../App";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOrders(user.username).then(data => { setOrders(data); setLoading(false); });
  }, [user]);

  if (loading) return <p className="loading">Carregando pedidos...</p>;
  if (orders.length === 0) return <div className="empty-cart"><p>📦 Nenhum pedido encontrado.</p></div>;

  return (
    <div className="orders-wrap">
      <h2>Meus Pedidos</h2>
      {orders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <span>Pedido #{order.id}</span>
            <span className={`status status-${order.status}`}>{order.status}</span>
          </div>
          <div className="order-items">
            {order.items.map(item => (
              <span key={item.book_id}>{item.quantity}x livro #{item.book_id}</span>
            ))}
          </div>
          <div className="order-footer">
            <span>{new Date(order.created_at).toLocaleDateString("pt-BR")}</span>
            <strong>R$ {order.total.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
