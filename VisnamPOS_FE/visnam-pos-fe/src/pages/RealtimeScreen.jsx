import React, { useState, useEffect } from "react";
import { orderService } from "../services/orderService";
import { startConnection, onOrderCreated, offOrderCreated } from "../services/signalr";

const RealtimeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();

    // Thiết lập kết nối SignalR
    startConnection();

    // Lắng nghe sự kiện tạo đơn hàng mới
    onOrderCreated((newOrder) => {
      setOrders((prevOrders) => {
        // Kiểm tra xem đơn hàng đã tồn tại trong danh sách chưa
        const isDuplicate = prevOrders.some((order) => order.orderId === newOrder.orderId);
        if (isDuplicate) return prevOrders;
        return [newOrder, ...prevOrders];
      });
    });

    return () => {
      // Hủy lắng nghe khi component unmount
      offOrderCreated();
    };
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrders();
      // Sắp xếp đơn hàng mới nhất lên đầu
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Đang tải danh sách đơn hàng...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Danh sách đơn hàng Realtime</h2>
        <span style={{ fontSize: "0.9em", color: "#28a745", fontWeight: "bold" }}>
          ● Đang kết nối trực tuyến
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", color: "#000" }}>
                Mã đơn hàng
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", color: "#000" }}>
                Tổng tiền
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", color: "#000" }}>
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                  Chưa có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderId} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", fontWeight: "500", color: "#000" }}>
                    {order.orderId}
                  </td>
                  <td style={{ padding: "12px", color: "#28a745", fontWeight: "bold" }}>
                    {order.totalAmount?.toLocaleString()} VND
                  </td>
                  <td style={{ padding: "12px", color: "#666" }}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : "---"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RealtimeScreen;
