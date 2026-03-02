import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import BadgeLevel from "../components/BadgeLevel";
import { ChevronRight, BookOpen, Loader2 } from "lucide-react";

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await API.get("/assignments");
                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    if (loading) {
        return (
            <div className="state state--page">
                <Loader2 size={32} className="spinner" color="#6366f1" />
                <span>Loading assignments…</span>
            </div>
        );
    }

    return (
        <div className="assignments">
            <div className="assignments__header">
                <div className="assignments__eyebrow">
                    <BookOpen size={14} />
                    <span>All Challenges</span>
                </div>
                <h1 className="assignments__title">SQL Assignments</h1>
                <p className="assignments__subtitle">
                    Pick a challenge and write a SQL query to solve it.
                </p>
            </div>

            {assignments.length === 0 ? (
                <div className="assignments__empty">No assignments found.</div>
            ) : (
                <div className="assignments__grid">
                    {assignments.map((assignment, idx) => (
                        <div
                            key={assignment.id}
                            className="assignment-card"
                            onClick={() => navigate(`/assignment/${assignment.id}`)}
                        >
                            <span className="assignment-card__number">
                                #{String(idx + 1).padStart(2, "0")}
                            </span>
                            <div className="assignment-card__badge">
                                <BadgeLevel level={assignment.difficulty} />
                            </div>
                            <h3 className="assignment-card__title">{assignment.title}</h3>
                            <p className="assignment-card__description">{assignment.description}</p>
                            <div className="assignment-card__cta">
                                Start challenge <ChevronRight size={13} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Assignments;