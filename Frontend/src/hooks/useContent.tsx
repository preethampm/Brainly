import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent({ tags }: { tags: string[] }) {
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);

    function refresh() {
        setLoading(true);
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            params: {
                tags: tags.join(",")
            }
        })
            .then((response) => {
                setContents(response.data.content);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        refresh();
    }, [tags]);

    return { loading, contents, refresh };
}
