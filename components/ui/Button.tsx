"use client";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const base = "px-4 py-2 rounded font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button onClick={onClick} type={type} className={`${base} ${styles}`}>
      {label}
    </button>
  );
}
