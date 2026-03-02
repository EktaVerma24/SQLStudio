import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/api";
import Editor from "@monaco-editor/react";
import ResultTable from "../components/ResultTable";
import BadgeLevel from "../components/BadgeLevel";
import toast from "react-hot-toast";
import { ArrowLeft, Play, Lightbulb, Loader2, TableIcon, Database } from "lucide-react";

function AssignmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [hint, setHint] = useState("");
    const [assignment, setAssignment] = useState(null);
    const [sampleData, setSampleData] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [executing, setExecuting] = useState(false);
    const [hintLoading, setHintLoading] = useState(false);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await API.get(`/assignments/${id}`);
                setAssignment(response.data);
            } catch (error) {
                console.error("Error fetching assignment:", error);
                toast.error("Failed to load assignment.");
            }
        };
        const fetchSampleData = async () => {
            try {
                const response = await API.get("/data");
                setSampleData(response.data);
            } catch (error) {
                console.error("Error fetching sample data:", error);
            }
        };

        fetchSampleData();
        fetchAssignment();
    }, [id]);

    const handleExecute = async () => {
        if (!query.trim()) {
            toast.error("Please enter a SQL query first.");
            return;
        }
        setIsCorrect(null);
        setResult(null);
        setExecuting(true);
        try {
            console.log("Executing query:", query, "for assignment ID:", id);
            const response = await API.post("/execute", { query, assignmentId: id });
            console.log("full res", response.data);
            setResult(response.data);
            setIsCorrect(response.data.isCorrect);
            if (response.data.isCorrect) {
                toast.success("Correct! Great work! 🎉");
            } else {
                toast.error("Incorrect — try again!");
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Error executing query";
            setResult({ error: msg });
            toast.error(msg);
        } finally {
            setExecuting(false);
        }
    };

    const handleHint = async () => {
        setHintLoading(true);
        try {
            const response = await API.post("/hint", { assignmentId: id, query });
            setHint(response.data.hint);
            toast("💡 Hint loaded!", { icon: "💡" });
        } catch (error) {
            setHint("Error fetching hint");
            console.error("Error fetching hint:", error.response?.data || error.message);
            toast.error("Could not fetch hint.");
        } finally {
            setHintLoading(false);
        }
    };

    return (
        <div className="detail">
            {/* Back */}
            <div className="detail__back">
                <button className="btn btn--link" onClick={() => navigate("/")}>
                    <ArrowLeft size={15} className="btn__icon" />
                    Back to assignments
                </button>
            </div>

            <div className="detail__layout">
                {/* ── LEFT PANEL ───────────────────────────────────── */}
                <div className="detail__left">

                    {/* Problem card */}
                    {assignment ? (
                        <div className="problem-card">
                            <div className="problem-card__badge">
                                <BadgeLevel level={assignment.difficulty} />
                            </div>
                            <h2 className="problem-card__title">{assignment.title}</h2>
                            <p className="problem-card__description">{assignment.description}</p>
                        </div>
                    ) : (
                        <div className="problem-card">
                            <div className="state">
                                <Loader2 size={16} className="spinner" /> Loading…
                            </div>
                        </div>
                    )}

                    {/* Sample data */}
                    {sampleData.length > 0 && (
                        <div className="sample-data">
                            <div className="sample-data__label">
                                <Database size={13} />
                                Sample Data — users
                            </div>
                            <div className="sample-data__scroll">
                                <table className="sample-data__table">
                                    <thead>
                                        <tr>
                                            {Object.keys(sampleData[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((value, i) => (
                                                    <td key={i}>{String(value ?? "null")}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Hint panel */}
                    {hint && (
                        <div className="hint-panel">
                            <div className="hint-panel__label">
                                <Lightbulb size={13} /> Hint
                            </div>
                            <p className="hint-panel__text">{hint}</p>
                        </div>
                    )}
                </div>

                {/* ── RIGHT PANEL ──────────────────────────────────── */}
                <div className="detail__right">

                    {/* Monaco editor */}
                    <div className="editor-wrapper">
                        <div className="editor-wrapper__chrome">
                            <span className="editor-wrapper__dot editor-wrapper__dot--red" />
                            <span className="editor-wrapper__dot editor-wrapper__dot--amber" />
                            <span className="editor-wrapper__dot editor-wrapper__dot--green" />
                            <span className="editor-wrapper__filename">query.sql</span>
                        </div>
                        <Editor
                            height="280px"
                            defaultLanguage="sql"
                            value={query}
                            onChange={(value) => setQuery(value || "")}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', monospace",
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                padding: { top: 12 },
                            }}
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="editor-actions">
                        <button className="btn btn--primary" onClick={handleExecute} disabled={executing}>
                            {executing ? <Loader2 size={15} className="spinner" /> : <Play size={15} />}
                            {executing ? "Running…" : "Run Query"}
                        </button>
                        <button className="btn btn--ghost" onClick={handleHint} disabled={hintLoading}>
                            {hintLoading ? <Loader2 size={15} className="spinner" /> : <Lightbulb size={15} />}
                            Get Hint
                        </button>
                    </div>

                    {/* Verdict */}
                    {isCorrect !== null && (
                        <div className={`verdict verdict--${isCorrect ? "correct" : "incorrect"}`}>
                            <span>{isCorrect ? "✅" : "❌"}</span>
                            {isCorrect
                                ? "Correct! Your query matches the expected output."
                                : "Incorrect — your output doesn't match. Keep trying!"}
                        </div>
                    )}

                    {/* Results */}
                    <div className="result-panel">
                        <div className="result-panel__label">
                            <TableIcon size={13} /> Query Results
                        </div>
                        <div className="result-panel__body">
                            <ResultTable result={result} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignmentDetail;