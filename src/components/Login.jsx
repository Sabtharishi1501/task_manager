import { useAuth } from "../context/AuthContext";

const features = [
  { icon: "📝", label: "Create tasks in seconds" },
  { icon: "📋", label: "See everything in one list" },
  { icon: "🔄", label: "Track progress: Planned → In Progress → Complete" },
];

export default function Login() {
  const { login } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>✓</div>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>
          A simple, no-fuss way to track what you're working on — create tasks, follow their
          progress, and mark them done, all in one place.
        </p>

        <button style={styles.button} onClick={login}>
          <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: "10px", flexShrink: 0 }}>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.4-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 12 24 12c3.1 0 5.8 1.1 8 3l6-6C34.6 6 29.6 4 24 4 16.1 4 9.2 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.8 14.2-4.9l-6.6-5.4C29.6 35.1 26.9 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.1 39.6 16 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.7l6.6 5.4C41.6 35.6 44 30.2 44 24c0-1.4-.1-2.7-.4-3.5z"/>
          </svg>
          Sign in with Google
        </button>

        <p style={styles.disclaimer}>
          Your tasks are private to your account. No spam, no extra permissions.
        </p>
      </div>

      <div style={styles.featureList}>
        {features.map((f) => (
          <div key={f.label} style={styles.featureRow}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <span style={styles.featureLabel}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "16px",
    background: "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #0f1117 60%)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#18181f",
    border: "1px solid #27272e",
    borderRadius: "16px",
    padding: "44px 40px 28px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  iconCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4285F4, #34A853)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "20px",
  },
  title: { fontSize: "26px", fontWeight: 700, margin: "0 0 10px" },
  subtitle: {
    color: "#a1a1aa",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: "0 0 28px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: 500,
    backgroundColor: "#fff",
    color: "#1f1f1f",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  disclaimer: {
    fontSize: "12px",
    color: "#52525b",
    marginTop: "16px",
    marginBottom: 0,
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "32px",
    maxWidth: "400px",
    width: "100%",
  },
  featureRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    backgroundColor: "#18181f",
    border: "1px solid #27272e",
    borderRadius: "10px",
  },
  featureIcon: { fontSize: "18px" },
  featureLabel: { fontSize: "13px", color: "#d4d4d8" },
};