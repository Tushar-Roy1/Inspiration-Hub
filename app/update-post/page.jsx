"use client";

import { useSearchParams } from 'next/navigation';
import { Form } from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

// Create a function to fetch post details
const fetchPostDetails = async (postId) => {
  const response = await fetch(`/api/post/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post details");
  }
  return response.json();
};

const EditPost = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get session data
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    post: '',
    tag: '',
  });
  const [error, setError] = useState(null); // State to handle errors

  const UpdatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
      alert("Post ID not found");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: post.post,
          title: post.title,
          userId: session?.user?.id, // Ensure session.user.id exists
          tag: post.tag,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      router.push('/'); // Navigate to homepage after successful update
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error state to display
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPostDetails = async () => {
      if (!postId) return; // Avoid unnecessary fetch if postId is not available

      try {
        const data = await fetchPostDetails(postId);
        
        setPost({
          post: data.post,
          title: data.title,
          tag: data.tag,
        });
      } catch (error) {
        console.error(error);
        setError(error.message); // Set error state to display
      }
    };

    getPostDetails();
  }, [postId]);

  return (
    <div>
      <h1>Edit Post</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <Suspense fallback={<div>Loading post details...</div>}>
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={UpdatePost}
        />
      </Suspense>
    </div>
  );
};

export default EditPost;
