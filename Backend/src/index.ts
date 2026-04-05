import express, { Request, Response } from "express";
import { random } from "./utils";
import { supabase } from "./supabase";
import { userMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.json({
        message: "User signed up",
        user: data.user
    });
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        res.status(403).json({ message: "Incorrect credentials" });
        return;
    }

    res.json({
        token: data.session.access_token,
        user: data.user
    });
});

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const { link, type, title, tags } = req.body;
    const userId = (req as any).userId;

    const tagIds = await Promise.all(tags.map(async (tagName: string) => {
        const { data: existingTag } = await supabase
            .from("tags")
            .select("id")
            .eq("name", tagName)
            .eq("user_id", userId)
            .single();

        if (existingTag) {
            return existingTag.id;
        }

        const { data: newTag } = await supabase
            .from("tags")
            .insert({ name: tagName, user_id: userId })
            .select("id")
            .single();

        return newTag?.id;
    }));

    const { error } = await supabase
        .from("content")
        .insert({
            link,
            type,
            title,
            user_id: userId,
            tags: tagIds
        });

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.json({ message: "Content added" });
});

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { tags } = req.query;

    let query = supabase
        .from("content")
        .select("*, tags(*)")
        .eq("user_id", userId);

    if (tags) {
        const tagNames = (tags as string).split(",");
        query = query.in("tags.name", tagNames);
    }

    const { data, error } = await query;

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.json({ content: data });
});

app.get("/api/v1/tags", userMiddleware, async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.json({ tags: data });
});

app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const contentId = req.body.contentId;
    const userId = (req as any).userId;

    const { error } = await supabase
        .from("content")
        .delete()
        .eq("id", contentId)
        .eq("user_id", userId);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.json({ message: "Deleted" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response) => {
    const share = req.body.share;
    const userId = (req as any).userId;

    if (share) {
        const { data: existingLink } = await supabase
            .from("links")
            .select("hash")
            .eq("user_id", userId)
            .single();

        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = random(10);
        await supabase
            .from("links")
            .insert({ user_id: userId, hash });

        res.json({ hash });
    } else {
        await supabase
            .from("links")
            .delete()
            .eq("user_id", userId);

        res.json({ message: "Removed link" });
    }
});

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
    const hash = req.params.shareLink;

    const { data: link } = await supabase
        .from("links")
        .select("user_id")
        .eq("hash", hash)
        .single();

    if (!link) {
        res.status(411).json({ message: "Sorry, incorrect input" });
        return;
    }

    const { data: content } = await supabase
        .from("content")
        .select("*, tags(*)")
        .eq("user_id", link.user_id);

    const { data: user } = await supabase
        .from("users")
        .select("email")
        .eq("id", link.user_id)
        .single();

    res.json({
        username: user?.email,
        content
    });
});

app.listen(3000);