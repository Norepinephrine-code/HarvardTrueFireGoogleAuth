import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FreedomPage from "./pages/FreedomPage";
import AgentPage from "./pages/AgentPage";
import AgentDetailPage from "./pages/AgentDetailPage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Notifier from "./components/Notifier";
import "./styles/root.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/freedomWall" element={<FreedomPage />} />
            <Route path="/agentWall" element={<AgentPage />} />
            <Route path="/agents/:id" element={<AgentDetailPage />} />
            <Route path="/posts/:id" element={<PostDetailPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </main>
        <Footer />
        <Notifier />
      </div>
    </Router>
  );
}

export default App;
