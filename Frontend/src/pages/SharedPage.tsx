import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function SharedPage() {
    const { shareLink } = useParams();
    const [content, setContent] = useState<any>(null);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
            .then(response => {
                setContent(response.data.content);
                setUsername(response.data.username);
            });
    }, [shareLink]);

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">{username}'s Content</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.map((item: any) => (
                    <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.link}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
