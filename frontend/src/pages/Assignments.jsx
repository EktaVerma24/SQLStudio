import {useEffect, useState} from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAssignments = async () => {
            try{
                const response = await API.get("/assignments");
                setAssignments(response.data);
            }catch (error){
                console.error("Error fetching assignments:", error);    
            }
        };

        fetchAssignments();
    }, []);

    return(
        <div>
            <h2>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments found.</p>
            ) : (
                assignments.map((assignment) => (
                    <div 
                        key={assignment.id} 
                        style={{ padding: "10px", marginBottom: "20px", cursor:"pointer"}}
                        onClick={()=> navigate(`/assignment/${assignment.id}`)}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p><strong> Difficult:</strong> {assignment.difficulty} </p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}
export default Assignments;