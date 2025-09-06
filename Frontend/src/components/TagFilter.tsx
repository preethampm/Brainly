import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function TagFilter({ onChange }: { onChange: (tags: string[]) => void }) {
    const [tags, setTags] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/tags`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setTags(response.data.tags);
        });
    }, []);

    const handleTagClick = (tag: any) => {
        const newSelectedTags = selectedTags.includes(tag.name)
            ? selectedTags.filter(t => t !== tag.name)
            : [...selectedTags, tag.name];
        setSelectedTags(newSelectedTags);
        onChange(newSelectedTags);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
                <button
                    key={tag._id}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedTags.includes(tag.name)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}>
                    {tag.name}
                </button>
            ))}
        </div>
    );
}
