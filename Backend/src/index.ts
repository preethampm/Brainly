import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const username = req.body.username;
    const password = req.body.password;

    try { 
        await UserModel.create({
            username: username,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

import { ContentModel, LinkModel, TagModel, UserModel } from "./db";

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title, tags } = req.body;
    const userId = req.userId;

    const tagIds = await Promise.all(tags.map(async (tagName: string) => {
        let tag = await TagModel.findOne({ name: tagName, userId });
        if (!tag) {
            tag = await TagModel.create({ name: tagName, userId });
        }
        return tag._id;
    }));

    await ContentModel.create({
        link,
        type,
        title,
        userId,
        tags: tagIds
    });

    res.json({
        message: "Content added"
    });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { tags } = req.query;

    let query: any = { userId };

    if (tags) {
        const tagNames = (tags as string).split(',');
        const tagIds = await TagModel.find({ name: { $in: tagNames }, userId }).distinct('_id');
        query.tags = { $in: tagIds };
    }

    const content = await ContentModel.find(query)
        .populate("userId", "username")
        .populate("tags", "name");

    res.json({
        content
    });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.get("/api/v1/tags", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const tags = await TagModel.find({ userId });
    res.json({ tags });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);