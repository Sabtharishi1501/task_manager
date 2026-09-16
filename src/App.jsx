import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.heading}>My Tasks</h1>
          <div style={styles.userBox}>
            {user.photoURL && (
              <img src={user.photoURL} alt="" style={styles.avatar} referrerPolicy="no-referrer" />
            )}
            <span style={styles.userName}>{user.displayName}</span>
            <button onClick={logout} style={styles.signOutBtn}>
              Sign out
            </button>
          </div>
        </header>

        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 16px",
    background: "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #0f1117 60%)",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
  },
  userName: {
    fontSize: "14px",
    color: "#a1a1aa",
  },
  signOutBtn: {
    padding: "6px 14px",
    fontSize: "13px",
    backgroundColor: "#27272e",
    color: "#e4e4e7",
    border: "1px solid #3f3f46",
    borderRadius: "6px",
    cursor: "pointer",
  },
};