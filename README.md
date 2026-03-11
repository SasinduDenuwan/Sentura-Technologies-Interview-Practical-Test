<div align="center">

# 🌍 Countries Explorer

### A full-stack web application to explore countries of the world

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org)

<br/>

> Explore every country on Earth — search by name, browse flags, capitals, regions, and populations — all in a clean, responsive interface.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#-architecture)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [🔌 API Reference](#-api-reference)
- [📱 UI Overview](#-ui-overview)
- [⚙️ Configuration](#-configuration)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Live Search** | Instantly filter countries by name as you type |
| 🏳️ **Country Flags** | Displays the flag of every country via PNG images |
| 🖥️ **Responsive Layout** | Table view on desktop, card grid on mobile |
| 🪟 **Detail Modal** | Click any country to see its full details in a popup |
| ⚡ **Smart Caching** | Backend caches country data for 10 minutes — fast & efficient |
| 🌐 **Real-world Data** | Powered by the free [REST Countries v3.1](https://restcountries.com) API |
| ⏳ **Loading States** | Animated spinner while data is being fetched |
| ⚠️ **Error Handling** | Friendly error banners if the backend is unreachable |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│                  React 19 + Vite (fe/)                   │
│        CountriesTable ─── CountryModal                   │
│               │ axios HTTP calls                         │
└───────────────┼──────────────────────────────────────────┘
                │  GET http://localhost:8080/api/countries
                ▼
┌──────────────────────────────────────────────────────────┐
│            Spring Boot 4 Backend (be/)                   │
│         CountryController → CountryService               │
│          In-Memory Cache (TTL: 10 minutes)               │
│               │ RestTemplate HTTP call                   │
└───────────────┼──────────────────────────────────────────┘
                │
                ▼
       https://restcountries.com/v3.1/all
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Java** | 21 | Core language |
| **Spring Boot** | 4.0.3 | REST API framework |
| **Spring Web** | — | HTTP controllers & `RestTemplate` |
| **Lombok** | — | Boilerplate reduction (`@Getter`, `@Setter`, etc.) |
| **Spring DevTools** | — | Hot reload during development |
| **Maven** | — | Build & dependency management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **Vite** | 7 | Build tool & dev server |
| **Axios** | — | HTTP client |
| **Vanilla CSS** | — | Styling (responsive, no framework) |
| **ESLint** | 9 | Code linting |

---

## 📁 Project Structure

```
New folder/
├── be/
│   └── Countries API Explorer/          # Spring Boot backend
│       ├── src/
│       │   └── main/
│       │       ├── java/com/wpsk/cae/countriesapi/
│       │       │   ├── CountriesApiExplorerApplication.java  # Entry point
│       │       │   ├── controller/
│       │       │   │   └── CountryController.java            # REST endpoints
│       │       │   ├── model/
│       │       │   │   └── Country.java                      # Data model
│       │       │   └── service/
│       │       │       └── CountryService.java               # Business logic & cache
│       │       └── resources/
│       │           └── application.properties
│       └── pom.xml
│
└── fe/
    └── countries-frontend/              # React + Vite frontend
        ├── src/
        │   ├── App.jsx                  # Root component
        │   ├── components/
        │   │   ├── CountriesTable.jsx   # Main table / card grid
        │   │   └── CountryModal.jsx     # Detail popup
        │   ├── service/
        │   │   └── api.js               # Axios API client
        │   ├── App.css                  # Application styles
        │   └── index.css               # Global styles
        ├── index.html
        ├── vite.config.js
        └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- ☕ **Java 21+** — [Download](https://adoptium.net)
- 🟢 **Node.js 18+** — [Download](https://nodejs.org)
- 📦 **npm** (bundled with Node.js)
- 🔧 **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi) *(or use the included `mvnw` wrapper)*

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd "be/Countries API Explorer"

# 2. Build the project
./mvnw clean install          # macOS/Linux
mvnw.cmd clean install        # Windows

# 3. Start the server
./mvnw spring-boot:run        # macOS/Linux
mvnw.cmd spring-boot:run      # Windows
```

The backend will start on **http://localhost:8080**.

> **First request?** The service will fetch data from `restcountries.com` and cache it. Subsequent requests within 10 minutes are served from the in-memory cache.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd fe/countries-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173**.

Open your browser and navigate to **http://localhost:5173** 🎉

---

## 🔌 API Reference

Base URL: `http://localhost:8080/api`

### Get All Countries

```http
GET /countries
```

**Response** `200 OK`

```json
[
  {
    "name": "Sri Lanka",
    "capital": "Sri Jayawardenepura Kotte",
    "region": "Asia",
    "population": 21919000,
    "flag": "https://flagcdn.com/w320/lk.png"
  },
  ...
]
```

---

### Search Countries by Name

```http
GET /countries/search?name={keyword}
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Partial or full country name (case-insensitive) |

**Example Request**

```http
GET /countries/search?name=ind
```

**Response** `200 OK` — Returns all countries whose name contains `"ind"` (e.g., India, Indonesia, etc.)

---

### Country Model

```json
{
  "name":       "string  — Common country name",
  "capital":    "string  — Capital city",
  "region":     "string  — World region (Asia, Europe, ...) ",
  "population": "long    — Total population",
  "flag":       "string  — URL of the PNG flag image"
}
```

---

## 📱 UI Overview

### Desktop View
- A full-width sortable **data table** with columns: Flag, Name, Capital, Region, Population
- Click any row to open the **Country Detail Modal**

### Mobile View
- Responsive **card grid** showing flag, name, capital, and region badge
- Tap any card to open the detail modal

### Country Detail Modal
- Large flag image
- Capital city 🏛️
- World region 🌐
- Population count  👥
- Dismiss by clicking the ✕ button or clicking outside the modal

---

## ⚙️ Configuration

### Backend (`application.properties`)

| Property | Default | Description |
|---|---|---|
| `server.port` | `8080` | Port the API server listens on |

### Frontend (`src/service/api.js`)

| Setting | Default | Description |
|---|---|---|
| `baseURL` | `http://localhost:8080/api` | Backend API base URL |

To point the frontend at a different backend host, update the `baseURL` in `fe/countries-frontend/src/service/api.js`:

```js
const API = axios.create({
  baseURL: "http://your-backend-host/api"
});
```

---

## 🤝 Contributing

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/awesome-feature`
3. **Commit** your changes: `git commit -m 'Add awesome feature'`
4. **Push** to the branch: `git push origin feature/awesome-feature`
5. **Open** a Pull Request

---

<div align="center">

**Data provided by [REST Countries](https://restcountries.com) — free & open API**

Made with ❤️ using Spring Boot & React

</div>
