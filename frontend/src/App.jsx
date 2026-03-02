import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Assignments />} />
          <Route path="/assignment/:id" element={<AssignmentDetail />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1e2130",
            color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
          },
          success: {
            iconTheme: { primary: "#34d399", secondary: "#0f1117" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#0f1117" },
          },
        }}
      />
    </div>
  );
}

export default App;