import { ReactElement } from "react";

export function SidebarItem({ text, icon, isOpen }: {
    text: string;
    icon: ReactElement;
    isOpen: boolean;
}) {
    return (
        <div className="flex items-center py-3 px-4 text-gray-300 cursor-pointer hover:bg-gray-800 rounded-lg transition-all duration-150">
            <div className="mr-4">
                {icon}
            </div>
            {isOpen && <span className="font-medium">{text}</span>}
        </div>
    );
}
