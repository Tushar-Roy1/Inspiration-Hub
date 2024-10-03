import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
    try {
        const { userId, title, post, tag } = await req.json();
        
      
        if (!userId || !title || !post || !tag) {
            return new Response("Missing required fields", { status: 400 });
        }

      
        await connectToDB();

        // Create a new post
        const newPost = new Post({
            creator: userId,
            title,
            post,
            tag
        });

      
        await newPost.save();

        
        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response("Failed to create post", { status: 500 });
    }
};
