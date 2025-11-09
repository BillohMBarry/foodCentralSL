# foodCentralSL
foodCentral is a full-stack web application designed to connect food vendors with customers. It provides a platform for vendors to manage their menus, track orders, and view sales analytics, notified via WhatsApp for orders. Customers can browse menus from different vendors, place orders, and proceed to checkout.

## Features

-   **User Authentication:** Secure sign-up and login for both customers and vendors.
-   **Vendor Dashboard:** A dedicated dashboard for vendors to:
    -   Manage their restaurant profile.
    -   Create, update, and delete menu items.
    -   View and manage incoming orders.
    -   Track revenue and order statistics.
    -   Generate QR codes for their menus.
-   **Customer Features:**
    -   Browse menus from various vendors.
    -   Add items to a shopping cart.
    -   Seamless checkout process.


## Tech Stack

### Frontend

-   **Framework:** [SvelteKit](https://kit.svelte.dev/)
-   **Bundler:** [Vite](https://vitejs.dev/)
-   **Styling:** tailwind css
-   **State Management:** Svelte Stores

### Backend

-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** MongoDB (implied, requires setup)
-   **Authentication:** Firebase, JWT

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [pnpm](https://pnpm.io/) (or npm/yarn)
-   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)
-   A [Firebase](https://firebase.google.com/) project for authentication.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BillohMBarry/foodCentralSL.git
    cd foodCentral
    ```

2.  **Setup Backend:**
    ```bash
    cd Backend
    npm install
    ```
    -   Create a `.env` file in the `Backend` directory.
    -   Add the following environment variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        FIREBASE_API_KEY=your_firebase_api_key
        ```

3.  **Setup Frontend:**
    ```bash
    cd ../Frontend
    npm install
    ```
    -   Create a `.env` file in the `Frontend` directory.
    -   Add the following environment variable to point to your backend API:
        ```env
        VITE_API_BASE_URL=http://localhost:5000
        ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd Backend
    npm start
    ```
    The backend server will be running on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd Frontend
    npm dev
    ```
    The application will be accessible at `http://localhost:5173`.

## Project Structure

```
foodCentral/
├── Backend/              # Express.js server
│   ├── config/           # Database, Firebase, etc.
│   ├── middleware/       # Custom middleware (auth, error handling)
│   ├── modules/          # Core feature modules (auth, menu, vendor)
│   └── server.js         # Main server entry point
└── Frontend/             # SvelteKit application
    ├── src/
    │   ├── lib/
    │   │   ├── components/ # Reusable UI components
    │   │   └── stores/     # Svelte stores for state management
    │   └── routes/         # Application pages and layouts
    └── svelte.config.js  # SvelteKit configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request



