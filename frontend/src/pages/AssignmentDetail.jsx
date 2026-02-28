import { useParams } from "react-router-dom";
import {useState} from "react";
import API from "../api/api";
import Editor from "@monaco-editor/react";
import ResultTable from "../components/ResultTable";

function AssignmentDetail() {
    const { id } = useParams();
    const[query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [hint, setHint] = useState("");

    const handleExecute = async () => {
        try {
            const response = await API.post("/execute", { query });
            setResult(response.data);
        } catch (error) {
            setResult({ error: error.response?.data?.error || "Error executing query" });
        }
    };

    const handleHint = async () => {
        try {
            const response = await API.post("/hint", { assignmentId: id, query: query });
            setHint(response.data.hint);
        } catch (error) {
            setHint("Error fetching hint");
            console.error("Error fetching hint:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Assignment {id}</h2>
            <Editor
                height="400px"
                defaultLanguage="sql"
                value={query}
                onChange={(value) => setQuery(value)}
                theme="vs-dark"
            />

            <button onClick={handleExecute} style={{ padding: "10px 20px", fontSize: "16px" }}> Execute </button>

            <button onClick={handleHint} style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}> Get Hint </button>

            <div style={{marginTop: "10px"}}>
                <h3>Query Result:</h3>
                <ResultTable result={result} />
            </div>
            <div style={{marginTop: "10px"}}>
                <strong>Hint:</strong>
                <p>{hint}</p>
            </div>
        </div>

    );
}
export default AssignmentDetail;