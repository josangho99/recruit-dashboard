import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Dashboard from "@/pages/Dashboard";
import Payment from "@/pages/Payment";
import MerChants from "./pages/MerChants";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="payment-list" element={<Payment />} />
        <Route path="merchants-list" element={<MerChants />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
