import React from "react";
import randomIntFromInterval from "../../utils/randomIntFromInterval";

const MessageLazyLoad = () => {
  const lineCount = randomIntFromInterval(1, 2);
  const nameLength = randomIntFromInterval(20, 60);
  const firstLineLength = randomIntFromInterval(2, 5);
  const firstParagraphLength = randomIntFromInterval(50, 100);
  const secondLineLength = lineCount === 2 ? randomIntFromInterval(2, 5) : 0;
  const secondParagraphLength =
    lineCount === 2 ? randomIntFromInterval(50, 100) : 0;

  return (
    <div className="message-lazy">
      <div className="image"></div>
      <div className="message-text">
        <div className="name" style={{ width: `${nameLength}%` }}></div>
        <div className="text" style={{ width: `${firstParagraphLength}%` }}>
          {[...Array(firstLineLength)].map((_, idx) => (
            <p></p>
          ))}
        </div>
        <div className="text" style={{ width: `${secondParagraphLength}%` }}>
          {[...Array(secondLineLength)].map((_, idx) => (
            <p></p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageLazyLoad;
