import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import TaskItem from "./TaskItem";

const FILTERS = ["All", "Planned", "In Progress", "Complete"];

function isDueToday(deadline) {
  if (!deadline) return false;
  const today = new Date().toISOString().split("T")[0];
  return deadline === today;
}

export default function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        taskData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setTasks(taskData);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load tasks:", error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user.uid]);

  const filteredTasks = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const counts = {
    All: tasks.length,
    Planned: tasks.filter((t) => t.status === "Planned").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Complete: tasks.filter((t) => t.status === "Complete").length,
  };

  const dueTodayTasks = tasks.filter(
    (t) => t.status !== "Complete" && isDueToday(t.deadline)
  );

  if (loading) {
    return <p style={{ color: "#71717a", fontSize: "14px" }}>Loading tasks...</p>;
  }

  return (
    <div>
      {dueTodayTasks.length > 0 && (
        <div style={styles.reminderBanner}>
          ⏰ <strong>{dueTodayTasks.length}</strong> task{dueTodayTasks.length > 1 ? "s" : ""} due
          today: {dueTodayTasks.map((t) => t.title).join(", ")}
        </div>
      )}

      <div style={styles.filterBar}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {}),
            }}
          >
            {f} <span style={styles.count}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🗒️</div>
          <p style={styles.emptyText}>No tasks yet — add your first one above.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🔍</div>
          <p style={styles.emptyText}>No tasks with status "{filter}".</p>
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  reminderBanner: {
    backgroundColor: "#2a1e0a",
    border: "1px solid #f0ad4e",
    color: "#fbbf24",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "16px",
    lineHeight: 1.5,
  },
  filterBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 500,
    backgroundColor: "#18181f",
    color: "#a1a1aa",
    border: "1px solid #27272e",
    borderRadius: "999px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  filterBtnActive: {
    backgroundColor: "#4285F4",
    color: "#fff",
    borderColor: "#4285F4",
  },
  count: {
    fontSize: "11px",
    opacity: 0.8,
  },
  empty: {
    textAlign: "center",
    padding: "40px 20px",
    border: "1px dashed #3f3f46",
    borderRadius: "10px",
  },
  emptyIcon: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  emptyText: {
    margin: 0,
    color: "#71717a",
    fontSize: "14px",
  },
};