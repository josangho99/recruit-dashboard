import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Dashboard from "@/components/dashboard/Dashboard";
import PaymentList from "@/components/payment-list/PaymentList";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="payment-list" element={<PaymentList />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
