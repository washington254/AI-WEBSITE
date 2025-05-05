import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

export const Benefits = (props) => {
  const { data, children } = props;

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${props.imgPos === "right" ? "lg:order-1" : ""
          }`}>
        <div className="relative w-full h-96 lg:h-[500px]">
          {children}
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${data.imgPos === "right" ? "lg:justify-end" : ""
          }`}>
        <div>
          <div className="flex flex-col w-full mt-4">
            <h1 className="text-5xl font-bold leading-snug tracking-tight">
            <span class="text-transparent bg-clip-text bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]">
              AI Marketing.
            </span>
            </h1>
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              {data.desc}
            </p>
            <div className="h-[1px] w-full my-6 rounded-full bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]"></div>
            <div className={`flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row ${data.imgPos === "right" ? "lg:justify-end" : ""}`}>
                  <a
                        href="#"
                        rel="noopener"
                        className="inline-block p-[2px] rounded-full border bg-[linear-gradient(75deg,_rgba(7,240,255,1)_1%,_rgba(82,0,255,1)_48%,_rgba(255,45,247,1)_100%)]"
                      >
                        <span className="block px-8 py-4 text-lg font-medium rounded-full 
                                        text-black bg-white 
                                        dark:text-white dark:bg-black">
                          Learn More
                        </span>
                      </a>

            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

function Benefit(props) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
        {React.cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>
  );
}
