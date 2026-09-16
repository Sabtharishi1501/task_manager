import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const STATUSES = ["Planned", "In Progress", "Complete"];

const statusStyles = {
  Planned: { color: "#a1a1aa", border: "#3f3f46" },
  "In Progress": { color: "#f0ad4e", border: "#f0ad4e" },
  Complete: { color: "#4ade80", border: "#4ade80" },
};

function timeAgo(timestamp) {
  if (!timestamp?.seconds) return "";
  const seconds = Math.floor(Date.now() / 1000 - timestamp.seconds);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(timestamp.seconds * 1000).toLocaleDateString();
}

function deadlineInfo(deadline) {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline + "T00:00:00");
  const diffDays = Math.round((due - today) / 86400000);

  if (diffDays < 0) return { label: `Overdue (${due.toLocaleDateString()})`, color: "#f87171" };
  if (diffDays === 0) return { label: "Due today", color: "#fbbf24" };
  if (diffDays === 1) return { label: "Due tomorrow", color: "#a1a1aa" };
  return { label: `Due ${due.toLocaleDateString()}`, color: "#a1a1aa" };
}

export default function TaskItem({ task }) {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Could not update task status. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteDoc(doc(db, "tasks", task.id));
    } catch (error) {
      console.error("Failed to delete task:", error.message);
      alert("Could not delete task. Please try again.");
    }
  };

  const style = statusStyles[task.status] || statusStyles.Planned;
  const dInfo = task.status !== "Complete" ? deadlineInfo(task.deadline) : null;

  return (
    <div style={styles.item}>
      <div style={styles.left}>
        <span style={{ ...styles.title, opacity: task.status === "Complete" ? 0.5 : 1 }}>
          {task.title}
        </span>
        <div style={styles.metaRow}>
          <span style={styles.timestamp}>{timeAgo(task.createdAt)}</span>
          {dInfo && (
            <span style={{ ...styles.deadlineBadge, color: dInfo.color, borderColor: dInfo.color }}>
              {dInfo.label}
            </span>
          )}
        </div>
      </div>
      <div style={styles.actions}>
        <select
          value={task.status}
          onChange={handleStatusChange}
          style={{ ...styles.select, color: style.color, borderColor: style.border }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button onClick={handleDelete} style={styles.deleteBtn} title="Delete task" aria-label="Delete task">
          ✕
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    backgroundColor: "#18181f",
    border: "1px solid #27272e",
    borderRadius: "10px",
    marginBottom: "10px",
    gap: "12px",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    minWidth: 0,
  },
  title: { fontSize: "15px", wordBreak: "break-word" },
  metaRow: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
  timestamp: { fontSize: "11px", color: "#52525b" },
  deadlineBadge: {
    fontSize: "11px",
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: "999px",
    border: "1px solid",
  },
  actions: { display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 },
  select: {
    padding: "6px 10px",
    borderRadius: "7px",
    border: "1.5px solid",
    fontSize: "13px",
    backgroundColor: "#0f1117",
    fontWeight: 600,
    cursor: "pointer",
  },
  deleteBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "7px",
    border: "1px solid #3f3f46",
    backgroundColor: "transparent",
    color: "#a1a1aa",
    cursor: "pointer",
    fontSize: "13px",
    lineHeight: 1,
  },
};