import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage, NotesPage } from "./pages";
import "./index.css";
import { BaseProvider } from "./providers";

const pages = [
  {
    container: "#home-page",
    component: (
      <BaseProvider>
        <HomePage />
      </BaseProvider>
    ),
  },
  {
    container: "#notes-page",
    component: (
      <BaseProvider>
        <NotesPage />
      </BaseProvider>
    ),
  },
];

pages.forEach((page) => {
  const element = document.querySelector(page.container);
  if (element) {
    ReactDOM.createRoot(element).render(page.component);
  }
});
