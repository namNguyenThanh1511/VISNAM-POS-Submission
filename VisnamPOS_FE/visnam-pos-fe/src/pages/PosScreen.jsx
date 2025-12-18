import React, { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { orderService } from "../services/orderService";

const PosScreen = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const orderData = {
        TotalAmount: totalAmount,
      };

      await orderService.createOrder(orderData);
      alert("Thanh toán thành công!");
      setCart([]);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  if (loading) return <div>Đang tải sản phẩm...</div>;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Danh sách sản phẩm */}
      <div style={{ flex: 2 }}>
        <h2>Danh sách sản phẩm</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          {products.length === 0 ? (
            <p>Không có sản phẩm nào.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3 style={{ margin: "10px 0", color: "#000" }}>{product.name}</h3>
                <p style={{ color: "#666" }}>{product.price?.toLocaleString()} VND</p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Giỏ hàng */}
      <div
        style={{ flex: 1, borderLeft: "1px solid #eee", paddingLeft: "20px", minWidth: "300px" }}
      >
        <h2>Giỏ hàng</h2>
        {cart.length === 0 ? (
          <p>Chưa có sản phẩm nào</p>
        ) : (
          <>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: "0.9em", color: "#666" }}>
                        {item.price?.toLocaleString()} x {item.quantity}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          color: "white",
                          backgroundColor: "#dc3545",
                          border: "none",
                          borderRadius: "4px",
                          padding: "2px 8px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tổng tiền:</span>
              <span>{totalAmount.toLocaleString()} VND</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              Thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PosScreen;
