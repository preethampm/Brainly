import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "danger";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
};

const defaultStyles = "px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
        >
            {startIcon && <div className="pr-2">{startIcon}</div>}
            {text}
        </button>
    );
}
