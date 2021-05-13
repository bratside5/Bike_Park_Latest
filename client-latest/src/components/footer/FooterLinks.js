import Link from "next/link";
import React from "react";

const FooterLinks = () => {
  return (
    <>
      <div className="flex-col items-center justify-end text-right w-full h-auto">
        <div className="w-full">
          <Link href="/gdpr">
            <a className="">Privacy Policy</a>
          </Link>
        </div>
        {/* <div className="w-full">
          <Link href="/contact">
            <a href="px-3">Contact Us</a>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default FooterLinks;
