const ProfDots = ({ filled }) => (
  <div className="prof-dots">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`prof-dot${i < filled ? " filled" : ""}`} />
    ))}
  </div>
);
export default ProfDots;