# 📚 Bookstore Demo

This project is a **client-side bookstore application** built with **Create React App**. It demonstrates a simple book management system where users can view, add, update, and delete authors, books, and ratings.

> 🔧 For demonstration purposes, the backend has been detached, and all data is managed client-side using browser **localStorage** with a versioning mechanism to ensure data consistency.

---

## ✨ Features

- View a list of authors, books, and their ratings.
- Add, update, or delete authors and books.
- Rate books and calculate average ratings for books and authors.
- Data persistence in browser **localStorage** with versioning to handle sample data updates.
- **TypeScript** support for type-safe development.
- Responsive **React-based** frontend.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd bookstore-demo
```

Install dependencies:

```bash
npm install
# or
yarn install
```

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload automatically when you make changes. Lint errors will show up in the console.

### `npm test`

Launches the test runner in interactive watch mode.  
See the running tests documentation for more details.

### `npm run build`

Builds the app for production to the `build` folder.  
It bundles React in production mode and optimizes the build for best performance.

### `npm run eject`

> ⚠️ **Note**: This is a one-way operation. Once you eject, you can’t go back!

Copies configuration files (webpack, Babel, ESLint, etc.) into your project for full customization.

---

## 🗂 Project Structure

```
src/
│
├── models/             # TypeScript interfaces (Author, Book, Rating)
├── providers/          # Data providers using localStorage and versioning
│   ├── authorProvider.ts
│   ├── bookProvider.ts
│   └── ratingProvider.ts
├── components/         # React UI components
├── App.tsx
└── index.tsx           # App entry point
```

---

## 💻 Local Development

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test data updates:

1. Clear `localStorage` in your browser:  
   *Developer Tools > Application > Local Storage > Clear*  
2. Refresh the page to verify sample data (20 authors, 50 books, and sample ratings) loads correctly.

> 🔁 The versioning mechanism ensures that updated sample data loads when changes are made.

---

## 🚢 Deployment

This project is configured for deployment on **Vercel**, but you can deploy it to any static hosting service that supports Create React App.

### ✅ Deploying to Vercel

Install the Vercel CLI:

```bash
npm install -g vercel
```

Log in to Vercel:

```bash
vercel login
```

Deploy the project:

```bash
vercel
# or
vercel --prod
```

> 🌐 Vercel will provide a URL (e.g., `https://your-project.vercel.app`) where your app is live.

### 📝 Notes for Deployment

- The app is entirely **client-side**, relying on `localStorage` for persistence.
- Ensure your `package.json` includes all necessary dependencies.
- If you update sample data in `authorProvider.ts`, `bookProvider.ts`, or `ratingProvider.ts`, **increment the `CURRENT_VERSION`** (e.g., from `"1.0"` to `"1.1"`) to refresh data in users' browsers.

---

## 🗄 Detached Backend

For this demo, the backend has been **intentionally detached** to simplify the application and focus on client-side functionality.

All CRUD operations for authors, books, and ratings are done in-browser using `localStorage`.

> 💡 In a real-world app, you’d integrate a backend (e.g., **Node.js + Express** with **MongoDB** or **PostgreSQL**) to persist data across users/devices.

---

## 📚 Learn More

- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🤝 Contributing

Contributions are welcome!  
Please open an issue or submit a pull request with your changes.

---

## 📄 License

This project is licensed under the **MIT License**.

---
