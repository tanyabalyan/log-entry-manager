import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { LogEntry } from './types/LogEntry'
import LogForm from './components/LogForm/LogForm'
import LogList from './components/LogList/LogList'


function App() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)

  const API_URL = 'http://localhost:3001/api/logs'

  const fetchLogs = async () => {
    try {
      const response = await axios.get<LogEntry[]>(`${API_URL}`)
      setLogs(response.data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <div className="app-container">
      <div className="app-box">
        <h1 className="app-title">Log Entry Manager</h1>

        <LogForm
          onSubmit={fetchLogs}
          selectedLog={selectedLog}
          clearSelection={() => setSelectedLog(null)} // Clear the selected log when the form is closed
        />

        <LogList
          logs={logs}
          onDelete={fetchLogs}
          onEdit={setSelectedLog} // Set the selected log when the edit button is clicked 
        />
      </div>
    </div>
  );
};

export default App
