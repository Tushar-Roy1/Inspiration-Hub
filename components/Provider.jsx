"use client";
import React from 'react';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children} {/* Correctly render the children prop */}
    </SessionProvider>
  );
}

export default Provider;
