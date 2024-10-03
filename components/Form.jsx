import React from 'react'
import Link from 'next/link'

export const Form = ({ type,post,setPost,submitting,handleSubmit}) => {
  return (
  <section className='w-full max-w-full flex-start flex-col'>
    <h1 className='head_text text-left '> <span className='blue_gradient'>{type} Post</span></h1>
    <p className='desc text-left max-w-md'>{type} and Share amazing idea with the world, and let your imagination run wild with the Inspiration Hub.</p>
    <form 
    onSubmit={handleSubmit}
    className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '
    >

      <label>
        <span className='font-santoshi font-semibold text-base yexy-gray-700'>
          Your Idea 
        </span>
        <input className='form_input'
        value={post.title}
        onChange={(e)=>setPost({...post,title:e.target.value})}
        placeholder="Write Your Idea Title Here"
        required
        ></input>
        <textarea className='form_textarea'
        value={post.post}
        onChange={(e)=>setPost({...post,post:e.target.value})}
        placeholder='Write Your Idea Here Within 100 Words'
        required
        ></textarea>
      </label>
      <label>
        <span className='font-santoshi font-semibold text-base yexy-gray-700'>
          Tag
          <span className='font-normal'>(#project,#startup,#webdevelopment)</span>
        </span>
        <input className='form_input'
        value={post.tag}
        onChange={(e)=>setPost({...post,tag:e.target.value})}
        placeholder="#tag"
        required
        ></input>
      </label>
      <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href="/" className='text-gray-400 text-sm'>Cancel</Link>
        <button className='px-5 py-1.5 text-sm bg-primary-orange rounded-lg text-white'>
          {submitting ? `${type}...` : type}
        </button>
      </div>
    </form>
  </section>
  )
}
