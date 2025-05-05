import React from "react";
import { Container } from "@/components/Container";
import Image from "next/image";
import BlobImage from "../../public/img/blob.svg";
export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center w-full h-full gap-3 mx-auto text-white bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)] px-3 py-3 lg:px-5 lg:py-6 lg:flex-nowrap rounded-xl">
        <div className="w-full lg:w-1/2 mx-3">
          <Image src={BlobImage} alt="blob" className="align-middle" />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-3xl font-bold leading-snug tracking-tight">
            Get exponential reach via AI Marketing
          </h3>
          <div className="md:flex md:items-center md:justify-between my-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 mb-3 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mb-0 sm:mr-3"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-base leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
