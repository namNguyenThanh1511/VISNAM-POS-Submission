# VisnamPOS - Full-Stack POS System

A modern Point of Sale (POS) application built with a .NET backend and a React frontend, fully containerized using Docker.

## 🚀 Overview

This project consists of two main components:

- **Backend**: A RESTful API built with ASP.NET Core 8.0, featuring real-time updates using SignalR.
- **Frontend**: A responsive web interface built with React and Vite, optimized for production with Nginx.

## 🛠 Tech Stack

### Backend

- **Framework**: .NET 8.0 Web API
- **Real-time**: SignalR
- **Architecture**: Clean Architecture (API, BLL, DAL layers)

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Server**: Nginx (for production container)
- **Communication**: SignalR Client, Fetch API

### Infrastructure

- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- Git (optional, for cloning)

## 🏃 How to Run

Follow these steps to get the system up and running:

### 1. Clone the repository

```bash
git clone <repository-url>
cd VISNAM-TEST
```

### 2. Launch with Docker Compose

Run the following command in the root directory (where `docker-compose.yml` is located):

```bash
docker-compose up --build
```

### 3. Access the application

Once the containers are running:

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Backend API**: Accessible at [http://localhost:5000/api](http://localhost:5000/api).
- **SignalR Hub**: Available at `http://localhost:5000/orderHub`.

## 🏗 Project Structure

```text
.
├── VisnamPOS/              # .NET Backend Solution
│   ├── visnam.pos/         # API Layer (Entry point)
│   ├── visnam.pos.bll/     # Business Logic Layer
│   └── visnam.pos.dal/     # Data Access Layer
├── VisnamPOS_FE/           # Frontend Project
│   └── visnam-pos-fe/      # React + Vite application
├── docker-compose.yml      # Orchestration for both services
└── README.md               # You are here
```

## ⚙️ Configuration

### Environment Variables

- **Frontend**: The API URL is configured via `VITE_API_BASE_URL`. In Docker, this is set to `http://localhost:5000/api` during the build process.
- **Backend**: Configured via `appsettings.json` and `Program.cs`. CORS is pre-configured to allow requests from the Dockerized frontend.

## 🐳 Docker Implementation Details

- **Frontend Build**: Uses a multi-stage Dockerfile.
  1. **Stage 1**: Compiles the React app using Node.js.
  2. **Stage 2**: Serves the static files using a lightweight Nginx server with custom routing support for Single Page Applications (SPA).
- **Backend Build**: Uses the standard Microsoft .NET SDK image to build and the ASP.NET runtime image for a small production-ready container.

## 📝 Notes

- The database is currently using a `FakeDatabase` (In-memory) for demonstration purposes.
- Make sure ports `3000` and `5000` are not being used by other applications on your machine.

## Video demo :

Open [Video](https://youtu.be/4zjjpmEFSsA).
