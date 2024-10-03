"use client";

import { useSearchParams } from 'next/navigation';
import { Form } from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import PostDetails from './PostDetails'; // Import the new component

const EditPost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    post: '',
    tag: '',
  });
  const [error, setError] = useState(null);

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
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      router.push('/');
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Suspense fallback={<div>Loading post details...</div>}>
        <PostDetails postId={postId} setPost={setPost} />
      </Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePost}
      />
    </div>
  );
};

export default EditPost;
