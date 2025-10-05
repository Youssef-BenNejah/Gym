export function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
