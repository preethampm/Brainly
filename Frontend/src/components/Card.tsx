import { TrashIcon } from "@heroicons/react/24/outline";

function getYoutubeVideoId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

export function Card({ content, onDelete }: { content: any, onDelete: (contentId: string) => void }) {
    const videoId = getYoutubeVideoId(content.link);

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            {videoId && (
                <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt={content.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-2">{content.title}</h2>
                    <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline break-all mb-4 block">{content.link}</a>
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map((tag: any) => (
                            <span key={tag._id} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{tag.name}</span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={() => onDelete(content._id)} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                        <TrashIcon className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
