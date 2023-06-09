import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Counter } from "./pages/Counter";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const routes = [
  { path: "/", element: "" },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/dashboard",
    element: (
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    ),
  },
];

const router = createBrowserRouter(
  routes.map((item) => ({
    ...item,
    element: (
      <div className="flex flex-row">
        <Sidebar />
        {item.element}
      </div>
    ),
  }))
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
