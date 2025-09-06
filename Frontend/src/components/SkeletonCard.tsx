export function SkeletonCard() {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
    );
}
