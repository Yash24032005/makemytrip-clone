# MakeMyTour — Full-Stack Travel Booking Engine

A dynamic, production-ready travel booking platform engineered with a high-performance Java Spring Boot microservice architecture, paired with a modern, responsive micro-frontend powered by Next.js and styled seamlessly with Tailwind CSS.

---

## 🏗️ System Architecture & Engineering

The application is decoupled into two primary components designed for high availability, modular development, and scalable cloud deployments:

1. **Frontend Hub (`makemytour`)**: Powered by **Next.js**, utilizing optimized UI layouts, smooth component state management, and an environment-variable configuration framework to gracefully interact with external endpoints.
2. **Backend Engine (`springboot-main`)**: Powered by **Spring Boot & Java 17**, operating an explicit Reflection & Jackson serialization bridge that standardizes dynamic data streams straight into the MongoDB cloud infrastructure.

---

## 🚀 Cloud Deployment Blueprint

   [ Client Browser ]
           │
           ▼
┌───────────────────────┐
│   Vercel Deployment   │  (Next.js Micro-Frontend)
│ 🚀 env: NEXT_PUBLIC   │
└───────────┬───────────┘
│ (Secure REST / CORS Tunnel)
▼
┌───────────────────────┐
│   Render Containers   │  (Dockerized Spring Boot App)
│ 🐋 Multi-Stage Engine │
└───────────────────────┘


### 🚂 1. Backend Core (Deployed on Render via Docker)
To bypass native cloud version conflicts and manage dependency trees safely, the Spring Boot application runs inside a multi-stage **Docker environment container**.
* **Docker Multi-Stage Compilation**: Utilizes a `maven:3.8.5-openjdk-17` container to compile build footprints safely, stripping debugging logs, and exposing production-ready execution parameters within a minimalist `openjdk-17-jdk-slim` grid.
* **Schema Mitigation Bypass**: Utilizes an intelligent string token schema (`==>`) packed into core repository fields to easily bridge data updates between frontend components and backend properties without refactoring database structures.

### 🌍 2. Frontend Layer (Deployed on Vercel)
The web client layer is highly optimized to run over global edge delivery networks.
* **Environmental Key Binding**: Uses the `NEXT_PUBLIC_API_URL` runtime variable to direct data traffic dynamically.
* **Hot-Reloading Interfaces**: Integrated with rigid component configurations to seamlessly transition from internal sandbox testing to global internet live states.

---

## 🛠️ Quick-Start Developer Environment

### Prerequisites
* **Java Runtime**: JDK 17 SE Installed
* **Node Environment**: Node v18+ & npm/yarn package managers

### Running the Project Locally

#### 1. Backend Service Initiation:
Ensure your `JAVA_HOME` variables are targeting a JDK 17 environment path. Open your terminal at the root directory and run:
```bash
# Compile and trigger the Spring Boot runtime application
./mvnw clean compile spring-boot:run
2. Frontend UI Hub Initiation:
Navigate into the user interface sub-directory, install the node dependencies, and run the development pipeline server:

Bash
cd makemytour
npm install
npm run dev
Open http://localhost:3000 inside your web sandbox browser to verify configurations and live data models.

📦 Production Builds & Verification
Before executing final commits or pushing releases to staging environments, confirm your environmental configurations match the cloud layout expectations:

Vercel Settings: In your Vercel Project Dashboard under Environment Variables, configure:

Key: NEXT_PUBLIC_API_URL

Value: https://your-backend-app.onrender.com

CORS Configurations: Ensure your backend security arrays dynamically approve traffic handling coming from your production Vercel sub-domain URLs.

⚡ Developed with architectural precision by Yash Bansal for modern engineering application portfolios, performance benchmarks, and end-to-end cloud ecosystem implementations.