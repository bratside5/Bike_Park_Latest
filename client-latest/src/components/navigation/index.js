import React, { useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitch from "./LanguageSwitch";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navBar = useRef();
  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="">
                    <div className="inline-flex items-center justify-center">
                      <Image
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 border rounded-full"
                        src="/images/BikePark.jpg "
                        alt="Bike Park Logo"
                        width={40}
                        height={40}
                      />
                      <p
                        onClick={() => setIsOpen(false)}
                        className="text-gray-50 ml-3 text-xl font-light"
                      >
                        Tignes Bike Park
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/trails">
                    <a className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Trails
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/infos">
                    <a className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Information
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/security">
                    <a className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Security
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <LanguageSwitch />
                  {/* <a className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"> */}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    onClick={() => setIsOpen(!isOpen)}
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref = { navBar }) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={navBar} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/trails">
                  <a
                    onClick={() => setIsOpen(!isOpen)}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Trails
                  </a>
                </Link>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/infos">
                  <a
                    onClick={() => setIsOpen(!isOpen)}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Information
                  </a>
                </Link>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/security">
                  <a
                    onClick={() => setIsOpen(!isOpen)}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Security
                  </a>
                </Link>
              </div>
              <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
                <Link href="/contact">
                  <a
                    onClick={() => setIsOpen(!isOpen)}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Emergency Contact
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
}

export default Nav;
