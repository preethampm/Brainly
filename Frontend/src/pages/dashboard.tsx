import { useState } from "react";
import { Button } from "../components/Button";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { ShareModal } from "../components/ShareModal";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/SkeletonCard";
import { TagFilter } from "../components/TagFilter";

export function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareLink, setShareLink] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { loading, contents, refresh } = useContent({ tags: selectedTags });

    async function deleteContent(contentId: string) {
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            data: {
                contentId
            }
        });
        refresh();
    }

    async function openShareModal() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        setShareLink(`${window.location.origin}/brain/${response.data.hash}`);
        setShareModalOpen(true);
    }

    function renderContent() {
        if (loading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            );
        }

        if (contents.length === 0) {
            return <EmptyState onAddContent={() => setCreateModalOpen(true)} />;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contents.map((content: any) => (
                    <Card key={content._id} content={content} onDelete={deleteContent} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <Sidebar isOpen={sidebarOpen} toggleOpen={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Button onClick={openShareModal} text="Share" variant="secondary" />
                        <Button onClick={() => setCreateModalOpen(true)} text="Add Content" variant="primary" />
                    </div>
                </header>
                <TagFilter onChange={setSelectedTags} />
                {renderContent()}
            </div>
            {createModalOpen && <CreateContentModal onClose={() => setCreateModalOpen(false)} refresh={refresh} />}
            {shareModalOpen && shareLink && <ShareModal shareLink={shareLink} onClose={() => setShareModalOpen(false)} />}
        </div>
    );
}
