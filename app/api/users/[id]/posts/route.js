import Post from "@models/post";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Validate params.id is a valid ObjectId
        if (!mongoose.isValidObjectId(params.id)) {
            return new Response("Invalid user ID", { status: 400 });
        }

        const posts = await Post.find({
            creator: params.id
        }).populate('creator'); // Populate the creator field

        return new Response(JSON.stringify(posts), { 
            status: 200,
            headers: {
                "Content-Type": "application/json" // Set Content-Type header
            }
        });
    } catch (error) {
        console.error("Error fetching posts:", error); // Log error for debugging
        return new Response("Failed to fetch all posts", { status: 500 });
    }
};
