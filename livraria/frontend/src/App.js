import React, { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import "./App.css";

export const AuthContext = createContext(null);
export const CartContext = createContext(null);

export function useAuth() { return useContext(AuthContext); }
export function useCart() { return useContext(CartContext); }

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("catalog");

  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(i => i.book_id === book.id);
      if (existing) return prev.map(i => i.book_id === book.id ? { ...i, quantity: i.quantity + 1, book } : i);
      return [...prev, { book_id: book.id, quantity: 1, book }];
    });
  };

  const removeFromCart = (book_id) => setCart(prev => prev.filter(i => i.book_id !== book_id));
  const clearCart = () => setCart([]);

  if (!user) return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Login />
    </AuthContext.Provider>
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        <div className="app">
          <nav className="navbar">
            <span className="nav-brand">📚 Livraria</span>
            <div className="nav-links">
              <button className={page === "catalog" ? "active" : ""} onClick={() => setPage("catalog")}>Catálogo</button>
              <button className={page === "orders" ? "active" : ""} onClick={() => setPage("orders")}>Meus Pedidos</button>
              <button className={page === "cart" ? "active" : ""} onClick={() => setPage("cart")}>
                Carrinho {cart.length > 0 && <span className="badge">{cart.length}</span>}
              </button>
              <button className="logout" onClick={() => setUser(null)}>Sair ({user.username})</button>
            </div>
          </nav>
          <main className="content">
            {page === "catalog" && <Catalog />}
            {page === "cart" && <Cart onOrderPlaced={() => setPage("orders")} />}
            {page === "orders" && <Orders />}
          </main>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
