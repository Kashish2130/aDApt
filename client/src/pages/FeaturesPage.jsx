import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen flex flex-col">
      {/* Shared Resource Library */}
      <div className="flex flex-row items-center p-8 border-b border-gray-300">
        {/* Left Side (Image) */}
        <div className="flex-1 flex justify-center" onClick={handleSharedResLib}>
          <img
            src="https://res.cloudinary.com/dzijmh8dz/image/upload/v1747330890/Brown_and_Beige_Academic_Books_Project_Presentation_cet0fg.png"
            alt="Shared Resource Library"
            className="rounded-md shadow-md"
          />
        </div>
        {/* Right Side (Text) */}
        <div className="flex-1 flex flex-col justify-center p-6">
          <h2
            className="text-2xl font-bold mb-4 cursor-pointer"
            onClick={handleSharedResLib}
          >
            Shared Resource Library
          </h2>
          <p className="text-lg text-gray-700">
            A centralized hub for sharing resources like documents, links, and
            materials with your team or community, promoting collaboration and
            efficiency.
          </p>
        </div>
      </div>

      {/* Q&A Manager */}
      <div className="flex flex-row-reverse items-center p-8 border-b border-gray-300">
        {/* Left Side (Image) */}
        <div className="flex-1 flex justify-center" onClick={handleQnA}>
          <img
            src="https://res.cloudinary.com/dzijmh8dz/image/upload/v1747327516/Blue_and_Orange_Geometric_Q_A_Youtube_Thumbnail_qg48ic.png"
            alt="Q&A Manager"
            className="rounded-md shadow-md"
          />
        </div>
        {/* Right Side (Text) */}
        <div className="flex-1 flex flex-col justify-center p-6">
          <h2
            className="text-2xl font-bold mb-4 cursor-pointer"
            onClick={handleQnA}
          >
            Q&A Manager
          </h2>
          <p className="text-lg text-gray-700">
            An interactive platform for managing questions and answers, ensuring
            seamless communication and resolution of queries within your group.
          </p>
        </div>
      </div>

      {/* Lost and Found Manager */}
      <div className="flex flex-row items-center p-8">
        {/* Left Side (Image) */}
        <div
          className="flex-1 flex justify-center"
          onClick={handlelostNfound}
        >
          <img src="https://placehold.co/1600x00?text=Lost+and+Found+Manager"
            alt="Lost and Found Manager"
            className="rounded-md shadow-md"
          />
        </div>
        {/* Right Side (Text) */}
        <div className="flex-1 flex flex-col justify-center p-6">
          <h2
            className="text-2xl font-bold mb-4 cursor-pointer"
            onClick={handlelostNfound}
          >
            Lost & Found Manager
          </h2>
          <p className="text-lg text-gray-700">
            A system to manage lost and found items, making it easy to reunite
            lost belongings with their rightful owners quickly and effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
