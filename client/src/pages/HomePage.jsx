import React from "react";
import "@fontsource/krona-one";
import "@fontsource-variable/grandstander";
import { motion } from "framer-motion";

const HomePage = () => {
  const imageUrl =
    "https://res.cloudinary.com/dzijmh8dz/image/upload/v1748277486/Clean_Violet_and_Modern_Background_Study_Plan_Docs_Banner_fogari.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#B1F0F7] via-[#F5F0CD] to-[#FADA7A]">
        {/* IMAGE SLIDER SECTION */}
        {/* {/* <div className="relative w-full overflow-hidden h-[400px] mt-12"> //! alternative in remaining file
          <div className="absolute top-0 left-0 flex animate-scroll-banner w-[200%]"> //! alternative in remaining file
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              }}
              style={{ width: "200%" }}
            > */}
              {/* Repeating the same image twice for looping */}
              {/* <img
                src={imageUrl}
                alt="Study Plan Banner"
                className="w-1/2 h-[400px] object-cover"
              />
              <img
                src={imageUrl}
                alt="Study Plan Banner"
                className="w-1/2 h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div> */}

        {/* MAIN CONTENT SECTION */}
        <div className="flex-grow flex items-center justify-center px-6 py-10">
          <main
            id="about"
            className="bg-white/60 backdrop-blur-md rounded-xl p-12 shadow-2xl border border-[#81BFDA] max-w-7xl w-full max-w-6xl mx-auto bg-white"
          >
            <h2
              className="text-4xl font-bold mb-6 text-center text-[#1A202C]"
              style={{ fontFamily: "'Krona One', sans-serif" }}
            >
              Why Choose aDApt?
            </h2>
            <p className="text-lg text-gray-800 text-center max-w-4xl mx-auto">
              aDApt brings together lost-and-found tracking, Q&A management, and
              a shared resource library into one seamless, user-friendly
              experience. Built by students for students.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-lg p-10 shadow-lg border-t-4 border-[#B1F0F7] hover:shadow-2xl transition duration-300 cursor-pointer">
                <h3 className="text-xl font-semibold mb-3 text-[#1A202C]">
                  Lost & Found
                </h3>
                <p className="text-gray-700">
                  Easily report and find lost items within your institution.
                </p>
              </div>
              <div className="cursor-pointer bg-white rounded-lg p-10 shadow-lg border-t-4 border-[#81BFDA] hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-[#1A202C]">
                  Q&A Manager
                </h3>
                <p className="text-gray-700">
                  Ask questions and get peer answers efficiently and publicly.
                </p>
              </div>
              <div className="cursor-pointer bg-white rounded-lg p-10 shadow-lg border-t-4 border-[#FADA7A] hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-[#1A202C]">
                  Shared Resources
                </h3>
                <p className="text-gray-700">
                  Centralized documents, notes, and materials shared by
                  students.
                </p>
              </div>
            </div>
          </main>
        </div>

        {/* FOOTER SECTION */}
        <footer className="bg-teal-700 text-white py-6 border-t border-yellow-400 shadow-inner">
          <div className="container mx-auto text-center max-w-7xl">
            <p className="text-sm font-light">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-bold">aDApt</span>. All Rights Reserved.
            </p>
            <p className="text-sm mt-1 font-light">
              Designed by{" "}
              <span className="font-semibold text-yellow-400">
                Kashish Jain
              </span>
            </p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default HomePage;
