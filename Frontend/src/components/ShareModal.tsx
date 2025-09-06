import { useState } from "react";
import { Button } from "./Button";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export function ShareModal({ shareLink, onClose }: { shareLink: string; onClose: () => void; }) {
    const [copied, setCopied] = useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-white">Share Your Brain</h2>
                <div className="flex items-center space-x-2">
                    <input type="text" value={shareLink} readOnly className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400" />
                    <Button onClick={copyToClipboard} text={copied ? "Copied!" : "Copy"} variant="primary" startIcon={<DocumentDuplicateIcon className="h-6 w-6" />} />
                </div>
                <div className="flex justify-end pt-6">
                    <Button onClick={onClose} loading={false} variant="secondary" text="Close" />
                </div>
            </div>
        </div>
    );
}
