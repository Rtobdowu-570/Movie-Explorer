export default function StatusPanel({
  kind = "empty",
  title,
  message,
  children,
  compact = false,
}) {
  const role = kind === "error" ? "alert" : "status";

  return (
    <div
      aria-live={kind === "error" ? "assertive" : "polite"}
      className={`status-panel status-panel--${kind}${compact ? " status-panel--compact" : ""}`}
      role={role}
    >
      <span aria-hidden="true" className="status-panel__mark" />
      <div className="status-panel__copy">
        <h3>{title}</h3>
        {message && <p>{message}</p>}
      </div>
      {children && <div className="status-panel__actions">{children}</div>}
    </div>
  );
}
