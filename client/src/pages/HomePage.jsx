import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
  const navigate = useNavigate();

  const handleIdClick =(e)=>{
    e.preventDefault();
    navigate("/IdPage");
  }

  return (
    <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://www.youtube.com/playlist?list=PLGaIlwi1LuTBGMn9kXyqTwQ7iVX5XNjpx"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            aDApt
          </span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleIdClick}
          >
            Your IDs
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomePage;
