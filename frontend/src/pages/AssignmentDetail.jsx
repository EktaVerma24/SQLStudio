import { useParams } from "react-router-dom";
import {useState} from "react";
import API from "../api/api";
import Editor from "@monaco-editor/react";
import ResultTable from "../components/ResultTable";

function AssignmentDetail() {
    const { id } = useParams();
    const[query, setQuery] = useState("");
    const [result, setResult] = useState(null);

    const handleExecute = async () => {
        try {
            const response = await API.post("/execute", { query });
            setResult(response.data);
        } catch (error) {
            setResult({ error: error.response?.data?.error || "Error executing query" });
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

            <div style={{marginTop: "10px"}}>
                <h3>Query Result:</h3>
                <ResultTable result={result} />
            </div>
        </div>
    );
}
export default AssignmentDetail;