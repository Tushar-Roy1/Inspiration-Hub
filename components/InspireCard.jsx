'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

// Function to truncate description to 100 words
const truncateText = (text, maxWords) => {
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

const InspireCard = ({ handleTagClick, post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => setCopied(''), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image 
            src={post.creator?.image || '/assets/images/logo.jpg'}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username || 'Unknown User'}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div onClick={handleCopy} className='copy_btn'>
          <Image
            src={copied === post.post ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            className='cursor-pointer'
          />
        </div>
      </div>

      <h2 className='font-bold font-sans text-slate-800 mt-2'>{post.title}</h2>
      <p className='my-4 font-satoshi text-sm text-gray-800'>
        {truncateText(post.post, 100)}
      </p>

      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
          <p className='font-inter text-sm text-red-600 cursor-pointer' onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  );
};

export default InspireCard;
