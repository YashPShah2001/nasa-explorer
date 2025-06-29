# NASA Explorer

A single-page React application that consumes NASA EONET Events APIs and displays events in an intuitive, filterable UI.

---

## Tech Stack

### Frontend
- [React](https://reactjs.org/) — UI library
- [Create React App](https://create-react-app.dev/) — Project scaffolding
- [MUI (Material UI)](https://mui.com/) — Components and icons
- [Bootstrap](https://getbootstrap.com/) — Styling and layout utilities

### Backend
- [Node.js](https://nodejs.org/) — Server runtime
- [Express](https://expressjs.com/) — REST API framework
- [Jest](https://jestjs.io/) — Testing

---

## Live Demo

- **Frontend:** [nasa-eonet-explorer.onrender.com](https://nasa-eonet-explorer.onrender.com)
- **Backend:** [nasa-explorer-ymn9.onrender.com](https://nasa-explorer-ymn9.onrender.com)

Please note: Render becomes slow due to inactivity, it will take time to load the initially.

---

## Setup & Installation

### Prerequisites

- Node.js : v20.16.0
- NPM : 10.8.1

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YashPShah2001/nasa-explorer.git
cd nasa-explorer
```

### 2️⃣ Install dependencies

#### Backend
Open new terminal and rename to backend
```bash
cd backend
npm install
```
#### Frontend
Open new terminal and rename to frontend
```bash
cd frontend
npm install
```
### 3️⃣ Test the backend
On the backend terminal, run test.
```bash
npm test
```

This will run jest tests and output the results.

### 4️⃣ Run application locally
#### Start the backend server
On the backend terminal, start the server
```bash
npm start
```
Alternatively, If you want to make changes and not keep starting again and again start server with below command
```bash
npm run dev
```
#### Start frontend React App
In the frontend terminal, start React app
```bash
npm start
```

## API Reference - For backend

You may refer to [NASA Eonet Events API](https://eonet.gsfc.nasa.gov/docs/v2.1#eventsAPI) as well.

### `GET /events`

Retrieve a list of natural events.

| **Parameter** | **Type** | **Description** | **Example** |
|---------------|----------|-----------------|-------------|
| `source`      | string   | Filter events by source ID. You can include multiple sources separated by commas (acts as boolean OR). | `/events?source=InciWeb`<br>`/events?source=InciWeb,EO`|
| `status`      | string   | Filter by event status. Accepts `open` or `closed`. If omitted, only currently open events are returned.| `/events?status=open`|
| `limit`       | number   | Limit the number of events returned.| `/events?limit=5`|
| `days`        | number   | Return only events from the last N days (including today).| `/events?days=20`|

### `GET /category/:id`

Retrieve events filtered by **Category ID**.

| **Parameter** | **Type** | **Description**| **Example**|
|---------------|----------|----------------|------------|
| `:id`         | number   | The **Category ID** to filter events.| `/categories/8`<br>`/categories/14`|
| `source`      | string   | Filter events by source ID. Multiple sources can be comma-separated (acts as boolean OR).| `/categories/8?source=InciWeb`<br>`/categories/14?source=InciWeb,EO` |
| `status`      | string   | Filter by event status (`open` or `closed`). If omitted, returns only currently open events.| `/categories/8?status=open`|
| `limit`       | number   | Limit the number of events returned.| `/categories/8?limit=5`|
| `days`        | number   | Return only events from the last N days (including today).| `/categories/8?days=20`|

**Note:**  
For the above endpoints, `/events` and `/categories/:id` have default parameters set:  
- `limit = 5`  
- `days = 10`  
- `status = open`
### `GET /all-categories`

Retrieve the list of all available categories.
```http
GET /all-categories
```

### `GET /sources`
Retrieve the list of all available sources.
```http
GET /sources
```
