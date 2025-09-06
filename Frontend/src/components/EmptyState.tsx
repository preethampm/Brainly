import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export function EmptyState({ onAddContent }: { onAddContent: () => void; }) {
    return (
        <div className="text-center py-16">
            <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-white">No content</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating new content.</p>
            <div className="mt-6">
                <button
                    onClick={onAddContent}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    <DocumentPlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add Content
                </button>
            </div>
        </div>
    );
}
