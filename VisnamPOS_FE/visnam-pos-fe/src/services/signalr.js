import * as signalR from "@microsoft/signalr";

const HUB_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "/orderHub") ||
  "https://localhost:7070/orderHub";

const connection = new signalR.HubConnectionBuilder()
  .withUrl(HUB_URL)
  .withAutomaticReconnect()
  .build();

export const startConnection = async () => {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      setTimeout(startConnection, 5000);
    }
  }
};

export const onOrderCreated = (callback) => {
  connection.on("OrderCreated", (order) => {
    callback(order);
  });
};

export const offOrderCreated = () => {
  connection.off("OrderCreated");
};

export default connection;
