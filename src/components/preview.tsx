"use client";
import React, { ReactNode, useState } from 'react';

export default function Preview(children: ReactNode, code: string){
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => {
    setShowCode(!showCode);
  };

  return (
    <div>
      <button onClick={toggleShowCode} className="p-2 bg-blue-500 text-white rounded">
        {showCode ? 'Show Component' : 'Show Code'}
      </button>
      <main className="flex min-h-[350px] w-full justify-center items-center p-2 sm:p-10 border rounded-lg bg-[url('/block.svg')]">
        {showCode ? <pre>{code}</pre> : children}
      </main>
    </div>
  );
};