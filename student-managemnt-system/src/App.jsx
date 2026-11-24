
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");

  function addStudent() {
    if (!name.trim() || marks === "" || marks < 0 || marks > 100) {
      alert("Enter valid name and marks (0-100)");
      return;
    }

    setStudents([...students, {
      name,
      marks: Number(marks),
      id: Date.now()
    }]);

    setName("");
    setMarks("");
  }

  function getGrade(m) {
    if (m >= 90) return "A";
    if (m >= 75) return "B";
    if (m >= 60) return "C";
    if (m >= 35) return "D";
    return "F";
  }

  function getResult(m) {
    return m >= 35 ? "Pass" : "Fail";
  }

  const filtered = students.filter(s =>
    filter === "All" || getResult(s.marks) === filter
  );

  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>
      <p>Manage Student Records & Results</p>

      <div className="form">
        <input
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Marks"
          value={marks}
          onChange={e => setMarks(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="filters">
        {["All", "Pass", "Fail"].map(f => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>{getGrade(s.marks)}</td>
              <td className={getResult(s.marks).toLowerCase()}>
                {getResult(s.marks)}
              </td>
              <td>
                <button onClick={() =>
                  setStudents(students.filter(x => x.id !== s.id))
                }>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
