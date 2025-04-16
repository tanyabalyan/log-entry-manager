import React from "react";
import { LogEntry } from "../../types/LogEntry";
import axios from "axios";
import "./LogList.css";

interface Props {
    logs: LogEntry[];
    onDelete: () => void;
    onEdit: (log: LogEntry) => void;
}

const LogList: React.FC<Props> = ({ logs, onDelete, onEdit }) => {
    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            await axios.delete(`http://localhost:3001/api/logs/${id}`);
            onDelete();
        }
    };

    if (logs.length === 0) {
        return <p className="empty-message">No log entries yet!!!</p>;
    }

    return (
        <div className="log-list">
            {logs.map((log) => (
                <div key={log.id} className="log-card">
                    <div className="log-header">
                        <h3 className="log-username">{log.userName}</h3>
                        <div className="log-actions">
                            <button onClick={() => onEdit(log)} className="edit-button">
                                ✏️ Edit
                            </button>
                            <button onClick={() => handleDelete(log.id)} className="delete-button">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                    <p className="log-description">{log.description}</p>
                    <div className="log-footer">
                        <span>📍 {log.location}</span>
                        <span>📅 {log.eventDate}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LogList;

