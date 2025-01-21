import React from "react";
import "@fontsource/krona-one";
import "@fontsource-variable/grandstander";
import NavbarComp from "../components/HomePage/NavbarComp";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavbarComp/>
        {/* CONTENT SECTION */}
        <div className="bg-gradient-to-r from-[#B1F0F7] via-[#81BFDA] via-[#F5F0CD] to-[#FADA7A] shadow-lg flex-grow flex items-center justify-center text-center rounded-lg m-3 px-8 py-12">
          <div className="text-gray-800">
            <h1
              className="text-7xl font-bold flex justify-center space-x-1"
              style={{ fontFamily: "'Grandstander Variable', system-ui" }}
            >
              {"aDApt".split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-scatter"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <p
              className="text-3xl mt-2 font-bold flex justify-center space-x-1"
              style={{ fontFamily: "'Krona One', sans-serif", fontWeight: 100 }}
            >
              {"A collaborative platform for students"
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    className="inline-block opacity-0 animate-scatter"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
            </p>
          </div>
        </div>

        {/* FOOTER SECTION */}
        <footer className="bg-white text-black py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} aDApt. All Rights Reserved.
            </p>
            <p className="text-sm">
              Designed by <span className="font-semibold">Kashish Jain</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
