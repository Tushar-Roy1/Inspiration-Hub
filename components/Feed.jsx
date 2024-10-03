"use client";
import InspireCard from './InspireCard';
import { useState, useEffect } from 'react';

// InspireCardList Component
const InspireCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <InspireCard
          key={post._id}
          handleTagClick={handleTagClick}
          post={post}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const cardsPerPage = 9; // Display 9 cards per page

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        const data = await response.json();
        setPosts(data.reverse()); // Reverse to show the latest post first
        setFilteredPosts(data.reverse()); // Same for filtered posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search text or clicked tag
  useEffect(() => {
    const tags = searchText.split(' ').map(tag => tag.replace('#', '').toLowerCase()); // Get tags from search text

    const filtered = posts.filter((post) => {
      const title = post?.title?.toLowerCase() || '';
      const username = post?.creator?.username?.toLowerCase() || '';
      const postTags = post?.tag?.toLowerCase().split(' '); // Split tags into an array

      // Check if title or username matches search text
      const titleMatch = title.includes(searchText.toLowerCase());
      const usernameMatch = username.includes(searchText.toLowerCase());

      // Check if any of the tags in the search text match the post tags
      const tagsMatch = tags.some(tag => postTags.includes(tag));

      return titleMatch || usernameMatch || tagsMatch; // Return true if any condition matches
    });

    setFilteredPosts(filtered); // Update filtered posts
  }, [searchText, posts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / cardsPerPage); // Calculate total number of pages
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredPosts.slice(indexOfFirstCard, indexOfLastCard); // Slice posts for the current page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTagClick = (tagName) => {
    setSearchText(`#${tagName}`); // Set search text to the clicked tag only
    setCurrentPage(1); // Reset to first page
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for an Idea!'
          value={searchText}
          required
          onChange={(e) => setSearchText(e.target.value)}
          className='search_input peer'
        />
      </form>

      <InspireCardList
        data={currentCards}  
        handleTagClick={handleTagClick}
      />

      {/* Pagination Controls */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Feed;
