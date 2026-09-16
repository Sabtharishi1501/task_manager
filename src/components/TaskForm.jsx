import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function TaskForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError("Please enter a task title before adding.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: trimmed,
        status: "Planned",
        deadline: deadline || null,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setTitle("");
      setDeadline("");
    } catch (err) {
      console.error("Failed to add task:", err.message);
      setError("Could not add task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          style={{ ...styles.input, borderColor: error ? "#f87171" : "#3f3f46" }}
          disabled={submitting}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={styles.dateInput}
          disabled={submitting}
          title="Deadline (optional)"
        />
        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: {
    flex: 1,
    minWidth: "160px",
    padding: "12px 14px",
    fontSize: "14px",
    backgroundColor: "#18181f",
    border: "1px solid #3f3f46",
    borderRadius: "8px",
    color: "#e4e4e7",
    outline: "none",
  },
  dateInput: {
    padding: "12px 14px",
    fontSize: "14px",
    backgroundColor: "#18181f",
    border: "1px solid #3f3f46",
    borderRadius: "8px",
    color: "#e4e4e7",
    outline: "none",
    colorScheme: "dark",
  },
  button: {
    padding: "0 20px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "#f87171",
    fontSize: "13px",
    marginTop: "8px",
    marginBottom: 0,
  },
};