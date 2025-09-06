import { Logo } from "../icons/Logo";
import { SidebarItem } from "./SidebarItem";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon, LinkIcon, HomeIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
    isOpen: boolean;
    toggleOpen: () => void;
}

export function Sidebar({ isOpen, toggleOpen }: SidebarProps) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={`h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"} fixed left-0 top-0 transition-all duration-300 flex flex-col`}>
            <div className="flex items-center justify-between p-4 h-20 border-b border-gray-800">
                <div className={`flex items-center text-2xl font-bold ${isOpen ? "" : "hidden"}`}>
                    <div className="pr-2">
                        <Logo />
                    </div>
                    <span>Brainly</span>
                </div>
                <button
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={toggleOpen}
                >
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
            <nav className="flex-1 px-4 py-8 space-y-2">
                <SidebarItem text="Dashboard" icon={<HomeIcon className="h-6 w-6" />} isOpen={isOpen} />
                <SidebarItem text="Links" icon={<LinkIcon className="h-6 w-6" />} isOpen={isOpen} />
            </nav>
            <div className="p-4 border-t border-gray-800">
                <Button onClick={logout} text={isOpen ? "Logout" : ""} variant="danger" startIcon={<ArrowLeftOnRectangleIcon className="h-6 w-6" />} fullWidth={true} />
            </div>
        </div>
    );
}