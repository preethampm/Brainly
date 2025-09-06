import { RefObject } from 'react';

interface InputProps {
    placeholder: string;
    reference?: RefObject<HTMLInputElement>;
    type?: string;
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
    return (
        <div className="mb-4">
            <input
                ref={reference}
                placeholder={placeholder}
                type={type}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
}
