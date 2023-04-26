import React, { useState } from 'react';
import { TiStarburst, TiStarburstOutline } from 'react-icons/ti';
export default function Star({ rate = 0, currentRate }) {
  const ratingColor = {
    1: 'text-red-500',
    2: 'text-orange-300',
    3: 'text-green-500',
  };
  const [click, setClick] = useState(() => rate || false);
  const [colorNumber, setNumber] = useState(rate);
  const renderStar = [...' '.repeat(3)].map((_, index) => {
    let star = {
      className: `inline-block ${
        index + 1 <= colorNumber ? ratingColor[colorNumber] : ''
      }`,
      onMouseEnter: rate ? () => {} : () => setNumber(index + 1),
      onMouseLeave: click ? () => {} : () => setNumber(0),
      onClick: () => {
        currentRate(index + 1);
        setClick(true);
        setNumber(index + 1);
      },
      title:
        index + 1 == 1
          ? 'Rating - Not Recomended'
          : index + 1 == 2
          ? 'Rating - Good'
          : 'Rating - Must Watch',
    };
    return index + 1 <= colorNumber ? (
      <TiStarburst key={index} {...star} />
    ) : (
      <TiStarburstOutline key={index} {...star} />
    );
  });
  return <div className={`text-xl sm:text-sm `}>{renderStar}</div>;
}
