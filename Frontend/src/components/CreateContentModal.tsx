import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { WithContext as ReactTags } from 'react-tag-input';

export function CreateContentModal({ onClose, refresh }: { onClose: () => void; refresh: () => void; }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [tags, setTags] = useState<any[]>([]);

    const handleDelete = (i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: any) => {
        setTags([...tags, tag]);
    };

    async function createContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type: "link",
            tags: tags.map(tag => tag.text)
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        refresh();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-white">Add Content</h2>
                <Input reference={titleRef} placeholder="Title" />
                <Input reference={linkRef} placeholder="Link" />
                <div className="mb-4">
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="bottom"
                        autocomplete
                    />
                </div>
                <div className="flex justify-end pt-6 space-x-4">
                    <Button onClick={onClose} loading={false} variant="secondary" text="Cancel" />
                    <Button onClick={createContent} loading={false} variant="primary" text="Add" />
                </div>
            </div>
        </div>
    );
}
