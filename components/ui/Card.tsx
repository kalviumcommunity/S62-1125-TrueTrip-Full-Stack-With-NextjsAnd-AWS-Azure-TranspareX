interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{description}</p>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
