"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log('Providers:', response); // Debug line
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex-gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.jpg" 
          alt="Inspiration-hub logo"
          width={45}
          height={45}
          className='object-contain rounded-full'
        />
        <p className='logo_text pl-2'>Inspiration Hub</p>
      </Link>

      {/* desktop-navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='blue_btn'>Create Post</Link>
            <button className='outline_btn' onClick={signOut} type="button">
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => {
                return ( // Ensure return statement here
                  <button
                    className='blue_btn' 
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In with {provider.name} {/* Show provider name */}
                  </button>
                );
              })
            }
          </>
        )}
      </div>

      {/* mobile-navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button 
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full blue_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => {
                return ( // Ensure return statement here
                  <button
                    className='blue_btn' 
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In with {provider.name} {/* Show provider name */}
                  </button>
                );
              })
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
