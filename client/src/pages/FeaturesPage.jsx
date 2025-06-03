import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react"; // Import motion for animations

const FeaturesPage = () => {
  const navigate = useNavigate();

  const handlelostNfound = (e) => {
    e.preventDefault();
    navigate("/lostnfound");
  };

  const handleQnA = (e) => {
    e.preventDefault();
    navigate("/QnA");
  };

  const handleSharedResLib = (e) => {
    e.preventDefault();
    navigate("/sharedreslib");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="relative min-h-screen overflow-hidden shadow-lg m-2 rounded-lg"
        style={{
          background: `linear-gradient(135deg, #B1F0F7, #81BFDA, #F5F0CD, #FADA7A)`,
        }}
      >
        {/* Blobs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-[1300px] mx-auto py-20 px-6 space-y-16 z-10">
          {/* Shared Resource Library */}
          <div className="w-full backdrop-blur-md bg-white/60 shadow-xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition-transform duration-300">
            <div
              className="md:w-1/2 cursor-pointer"
              onClick={handleSharedResLib}
            >
              <img
                src="https://res.cloudinary.com/dzijmh8dz/image/upload/v1747749823/Brown_and_Beige_Academic_Books_Project_Presentation_ozgqdo.png"
                alt="Shared Resource Library"
                className="rounded-xl w-full object-cover shadow-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2
                className="text-3xl font-bold text-gray-800 cursor-pointer"
                onClick={handleSharedResLib}
              >
                Shared Resource Library
              </h2>
              <p className="text-gray-700 text-lg">
                A centralized hub for sharing resources like documents, links,
                and materials with your team or community, promoting
                collaboration and efficiency.
              </p>
              <button
                onClick={handleSharedResLib}
                className="mt-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold shadow hover:bg-teal-700 transition flex items-center gap-2"
              >
                Go to Shared Resource Library
                <MoveRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Q&A Manager */}
          <div className="w-full backdrop-blur-md bg-white/60 shadow-xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row-reverse items-center gap-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="md:w-1/2 cursor-pointer" onClick={handleQnA}>
              <img
                src="https://res.cloudinary.com/dzijmh8dz/image/upload/v1747327516/Blue_and_Orange_Geometric_Q_A_Youtube_Thumbnail_qg48ic.png"
                alt="Q&A Manager"
                className="rounded-xl w-full object-cover shadow-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2
                className="text-3xl font-bold text-gray-800 cursor-pointer"
                onClick={handleQnA}
              >
                Q&A Manager
              </h2>
              <p className="text-gray-700 text-lg">
                An interactive platform for managing questions and answers,
                ensuring seamless communication and resolution of queries within
                your group.
              </p>
              <button
                onClick={handleQnA}
                className="mt-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold shadow hover:bg-teal-700 transition flex items-center gap-2"
              >
                Go to Q&A Manager
                <MoveRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Lost and Found Manager */}
          <div className="w-full backdrop-blur-md bg-white/60 shadow-xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="md:w-1/2 cursor-pointer" onClick={handlelostNfound}>
              <img
                src="https://res.cloudinary.com/dzijmh8dz/image/upload/v1747749326/Red_Yellow_Creative_Minimalist_Restaurant_Banner_Horizontal_uxjnjz.png"
                alt="Lost and Found Manager"
                className="rounded-xl w-full object-cover shadow-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2
                className="text-3xl font-bold text-gray-800 cursor-pointer"
                onClick={handlelostNfound}
              >
                Lost & Found Manager
              </h2>
              <p className="text-gray-700 text-lg">
                A system to manage lost and found items, making it easy to
                reunite lost belongings with their rightful owners quickly and
                effectively.
              </p>
              <button
                onClick={handlelostNfound}
                className="mt-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold shadow hover:bg-teal-700 transition flex items-center gap-2"
              >
                <MoveLeft className="w-5 h-5 mr-2" />
                Go to Lost & Found Manager
              </button>
            </div>
          </div>
        </div>

        {/* Custom Tailwind Keyframes */}
        <style>
          {`
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
        </style>
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
