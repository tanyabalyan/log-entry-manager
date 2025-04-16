import React, { useEffect, useState } from "react";
import { LogEntry } from "../../types/LogEntry";
import './LogForm.css';
import axios from "axios";

interface Props {
    onSubmit: () => void;
    selectedLog: LogEntry | null;
    clearSelection: () => void;
}

const LogForm: React.FC<Props> = ({ onSubmit, selectedLog, clearSelection }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (selectedLog) {
            setName(selectedLog.userName);
            setDescription(selectedLog.description);
            setDate(selectedLog.eventDate);
            setLocation(selectedLog.location);
        } else {
            const savedName = localStorage.getItem("lastName");
            if (savedName) setName(savedName);
            setDescription("");
            setDate("");
            setLocation("");
        }
    }, [selectedLog]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const logData = {
            userName: name,
            description: description,
            eventDate: date,
            location: location
        };

        if (selectedLog) {
            await axios.put(`http://localhost:3001/api/logs/${selectedLog.id}`, logData);
        } else {
            await axios.post("http://localhost:3001/api/logs", logData);
            localStorage.setItem("lastName", name);
            // Reset all fields except name after adding new entry
            setDescription("");
            setDate("");
            setLocation("");
        }

        onSubmit();
        clearSelection();
    };

    return (
        <form onSubmit={handleSubmit} className="log-form">
            <div className="form-group">
                <label>Name</label>
                <input
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    className="form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What happened?"
                    required
                />
            </div>

            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Set the max date to today's date
                    required
                />
            </div>

            <div className="form-group">
                <label>Location</label>
                <input
                    className="form-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or place"
                    required
                />
            </div>

            <div className="form-actions">
                {selectedLog && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={clearSelection}
                    >
                        Cancel Edit
                    </button>
                )}
                <button
                    type="submit"
                    className="submit-btn"
                >
                    {selectedLog ? "Update Entry" : "Add Entry"}
                </button>
            </div>
        </form>
    );
};

export default LogForm;
