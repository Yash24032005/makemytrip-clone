$readmeContent = @'
# MakeMyTrip Clone - Full Stack Travel Booking Platform

A production-ready, full-stack flight and hotel booking platform built using modern framework architectures. The project features a robust **Spring Boot (Java)** backend handling complex schemas, coupled with a highly responsive **Next.js (React/TypeScript)** frontend.

## 🚀 Live Deployments

*   **Frontend (Next.js):** [https://makemytrip-clone-eight.vercel.app/](https://makemytrip-clone-eight.vercel.app/)
*   **Backend API (Spring Boot):** [https://makemytrip-clone-17hl.onrender.com/](https://makemytrip-clone-17hl.onrender.com/)

---

## 🏗️ Project Architecture & Tech Stack

The workspace is organized as a unified monorepo streamlining cross-origin data flows:

### 🟢 Backend Layer
*   **Framework:** Spring Boot 3.x (Java 17)
*   **Database:** MongoDB Atlas (NoSQL cloud cluster)
*   **Key Modules:** Spring Data MongoDB, Lombok, Spring Web (RESTful Controllers)
*   **Architecture Pattern:** Controller-Repository-Model clean abstraction layer

### 🔵 Frontend Layer
*   **Framework:** Next.js 16 (React 19 ecosystem)
*   **Build Optimization:** Turbopack for lightning-fast compilation
*   **Styling:** Tailwind CSS + Shadcn UI primitive structural elements
*   **State Management:** Redux Toolkit (Data store hydration)
*   **HTTP Client:** Axios (Centralized API interceptor layer)

---

## 📂 Streamlined Folder Structure

```text
make-my-trip-clone-springboot-main/
├── makemytour/               <-- Frontend (Next.js Workspace)
│   ├── src/
│   │   ├── components/       <-- Navbar, SearchSelect, Custom UI Dialogs
│   │   ├── pages/            <-- index.tsx, admin.tsx, book-flight/[id]
│   │   ├── ui/               <-- Shadcn structural layout elements
│   │   └── api.js            <-- Centralized HTTPS absolute endpoints config
│   ├── package.json
│   └── tailwind.config.ts
├── src/main/java/            <-- Backend (Spring Boot Workspace)
│   └── com/makemytrip/
│       ├── controllers/      <-- FlightController.java, UserController.java
│       ├── models/           <-- Flight.java (Standard JSON schema model)
│       └── repositories/     <-- FlightRepository.java (MongoRepository mappings)
├── Dockerfile                <-- Multi-stage cloud deployment builds
└── pom.xml                   <-- Maven dependencies and plugins pipeline