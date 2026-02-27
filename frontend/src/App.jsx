import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>CipherSQL Studio</h1>

      <Routes>  
        <Route path="/" element={<Assignments />} />
        <Route path="/assignment/:id" element={<AssignmentDetail />} />
      </Routes>
    </div>
  );
}
export default App;