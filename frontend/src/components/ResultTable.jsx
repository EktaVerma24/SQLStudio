import { TableIcon } from "lucide-react";

function ResultTable({ result }) {
    if (!result) {
        return (
            <div className="result-table__empty">
                <TableIcon size={16} />
                Run a query to see results
            </div>
        );
    }

    if (result.error) {
        return (
            <div className="result-table__error">
                <span>⚠</span>
                <span>{result.error}</span>
            </div>
        );
    }

    const rows = result.rows;

    if (!rows || rows.length === 0) {
        return (
            <div className="result-table__empty">
                Query returned 0 rows.
            </div>
        );
    }

    const columns = Object.keys(rows[0]);

    return (
        <div className="result-table">
            <div className="result-table__scroll">
                <table className="result-table__table">
                    <thead className="result-table__head">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="result-table__th">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="result-table__row">
                                {columns.map((col) => (
                                    <td key={col} className="result-table__td">
                                        {String(row[col] ?? "null")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="result-table__footer">
                {rows.length} row{rows.length !== 1 ? "s" : ""} returned
            </div>
        </div>
    );
}

export default ResultTable;