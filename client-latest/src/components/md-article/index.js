import ReactMarkdown from "react-markdown";

import React from "react";

const RenderMarkDown = ({ article }) => {
  return (
    <>
      <div className="w-full h-auto flex justify-center">
        <div className="text-center my-3">
          <article className="prose lg:prose-lg">
            <ReactMarkdown>{article}</ReactMarkdown>
          </article>
        </div>
      </div>
    </>
  );
};

export default RenderMarkDown;
