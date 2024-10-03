"use client";

import { Form } from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Change this import
import { useState } from 'react';

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title:'',
    post: '',
    tag: '',
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          post: post.post,
          title:post.title,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/'); // Navigate to homepage after post creation
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </div>
  );
};

export default CreatePost;
