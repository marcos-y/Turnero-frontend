export default function Badge({ onClick, label }) {
  const style = {
    display: "inline-block",
    padding: "0.5px 6px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    userSelect: "none",
  };

  return (
    <span style={style} onClick={onClick}>
      {label}
    </span>
  );
}