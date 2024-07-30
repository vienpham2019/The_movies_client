import { useState } from "react";

export default function ReviewDetail({ review }) {
  const [showText, setShowText] = useState(false);
  const { author, date, score, content } = review;
  return (
    <div className="review border py-4 px-2 bg-white shadow my-3">
      <div className="review-body">
        <div className="row">
          <div className="col-12 col-md-auto">
            <div className="py-5 pl-3">
              <span className="p-5 rounded-circle bg--light--gray">
                <i className="fa fa-user"></i>
              </span>
            </div>
          </div>
          <div className="col-12 col-md">
            <div className="row mb-6">
              <div className="col-12">
                <div className="rating font-size-sm text-dark">
                  {Array.from(Array(10)).map((_, i) => (
                    <i
                      className={`${i + 1 <= score ? "fas" : "far"} fa-star `}
                      key={"movie detail page movie review detail star " + i}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="col-12 mb-3 mt-1">
                <span className="font-size-xs" style={{ fontSize: "0.9em" }}>
                  {author}, <time>{date}</time>
                </span>
              </div>
            </div>

            <p
              className={`text-gray-500 pl-3 pr-5 ${
                !showText && "over-flow-text"
              }`}
            >
              {content}
            </p>
            <p
              className="w-100 text-right px-5 text-secondary"
              onClick={() => setShowText(!showText)}
              role="button"
            >
              {content.length > 300 && (
                <strong>{showText ? "Show less" : "Read more"}</strong>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
