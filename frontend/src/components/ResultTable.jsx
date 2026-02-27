function ResultTable({ result}) {
    if(!result) {
        return <p style={{color: "red"}}>No result data available.</p>;
    }
    if(result.error) {
        return <p style={{color: "red"}}>{result.error}</p>;
    }
    if(!result.rows || result.rows.length === 0){
        return <p>No results found.</p>;
    }
    const columns = Object.keys(result.rows[0]);

    return (
        <table border="1" cellPadding="10" style={{borderCollapse: "collapse", marginTop: "20px"}}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {result.rows.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col) => ( 
                            <td key={col}>{row[col]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default ResultTable;