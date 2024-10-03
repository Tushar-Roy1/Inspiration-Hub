// Import statements at the top of the file
import Post from "@models/post"; // Ensure correct import
import { connectToDB } from "@utils/database"; // Ensure correct import
import mongoose from "mongoose";

// GET request handler
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Validate params.id is a valid ObjectId
        if (!mongoose.isValidObjectId(params.id)) {
            return new Response("Invalid post ID", { status: 400 });
        }

        // Correctly fetch the post by ID
        const post = await Post.findById(params.id).populate('creator'); // Populate the creator field

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: {
                "Content-Type": "application/json" // Set Content-Type header
            }
        });
    } catch (error) {
        console.error("Error fetching post:", error); // Log error for debugging
        return new Response("Failed to fetch post", { status: 500 });
    }
};

// PATCH request handler
export const PATCH = async (request, { params }) => {
    const { post, title, tag } = await request.json();

    try {
        await connectToDB();
        const existingPost = await Post.findById(params.id);

        if (!existingPost) return new Response("Post not found", { status: 404 });

        // Validate fields before updating
        if (post) existingPost.post = post;
        if (title) existingPost.title = title;
        if (tag) existingPost.tag = tag;

        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {
            status: 200,
            headers: {
                "Content-Type": "application/json" // Set Content-Type header
            }
        });

    } catch (error) {
        console.error("Failed to update post:", error); // Log error for debugging
        return new Response("Failed to update post", { status: 500 });
    }
};

// DELETE request handler
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        const deletedPost = await Post.findByIdAndDelete(params.id);

        if (!deletedPost) return new Response("Post not found", { status: 404 });

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete post:", error); // Log error for debugging
        return new Response("Failed to delete post", { status: 500 });
    }
};
