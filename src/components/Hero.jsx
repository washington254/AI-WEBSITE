'use client'

import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/hero.png";
import Grouplogo from "../../public/img/group.svg";

export const Hero = ({ children }) => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full min-h-screen lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            <span class="text-transparent bg-clip-text bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]">
              AI Marketing.
            </span>

            <br/>
            Optimized Reach.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            Our vision is to revolutionize the way brands and advertisers target, reach
            </p>

            <div className="h-[1px] w-full my-6 rounded-full bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]"></div>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <a
                  href="#"
                  rel="noopener"
                  className="inline-block p-[2px] rounded-full border bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]"
                >
                  <span className="block px-8 py-4 text-lg font-medium rounded-full 
                                  text-black bg-white 
                                  dark:text-white dark:bg-black">
                    Get Started
                  </span>
                </a>

            
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-center w-full lg:w-1/2">
          {children}
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Trusted by <span className="text-indigo-600">2000+</span>{" "}
            customers worldwide
          </div>

          <div className="flex flex-wrap justify-center gap-5 my-10 md:justify-around">
            <div>
              <Image src={Grouplogo} alt="logo" />
            </div>
        
          </div>
        </div>
      </Container>
    </>
  );
}

