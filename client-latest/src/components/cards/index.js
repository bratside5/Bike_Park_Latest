import React from "react";
import NextImage from "@/components/image";
import Link from "next/link";
import slugify from "slugify";

const Cards = ({ data }) => {
  const {
    title,
    description_en,
    access_en,
    description_fr,
    access_fr,
    image_principale: { url, width, height },
  } = data;

  const excerpt_en = description_en.slice(0, 150);

  let slug;
  slug = title;
  const linkTo = slugify(slug, { lower: true, strict: true, replacement: "-" });
  console.log(`Slug is ${linkTo}`);

  return (
    <>
      <Link href={`trails/${linkTo}`}>
        <a>
          <div className="mx-auto max-w-xs rounded-lg shadow-lg my-2 bg-white">
            <div className="relative mb-6">
              <NextImage url={url} width={width} height={height} />

              <div
                className="text-center absolute w-full mx-auto"
                style={{ bottom: -30, left: 30 }}
              >
                <div className="mb-10 bg-gray-50 w-1/2 border rounded ">
                  <p className="text-gray-900 tracking-wide uppercase text-lg font-bold">
                    {title}
                  </p>
                </div>
              </div>
            </div>
            <div className="pb-12 px-6 text-center tracking-wide w-full">
              <p className="text-gray-400 text-sm">{excerpt_en}...</p>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default Cards;
