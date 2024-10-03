"use client"
import Profile from "@components/Profile"
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const MyProfile = () => {
    const {data:session}=useSession();
    const [posts, setPosts] = useState([]);
   const router = useRouter();
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();  // Awaiting the response
          console.log('Fetched posts:', data);  // Log the fetched data
          setPosts(data);  // Set posts with the fetched data
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      if (session?.user.id) fetchPosts();
  }, [session?.user.id]); 
  


    const handleEdit=async (post)=>{
     router.push(`/update-post?id=${post._id}`)
     
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this post?");
  
      if (hasConfirmed) {
          try {
              const response = await fetch(`/api/post/${post._id.toString()}`, {
                  method: 'DELETE'
              });
  
              if (!response.ok) {
                  throw new Error('Failed to delete the post');
              }
  
              // Update the state to remove the deleted post
              const filteredPosts = posts.filter((p) => p._id !== post._id);
              setPosts(filteredPosts);
          } catch (error) {
              console.error('Error deleting post:', error);
          }
      }
  }
  



  return (
   <Profile
   data={posts}
   name="My"
   desc="Welcome to Your personalize profile page"
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   />
  )
}

export default MyProfile