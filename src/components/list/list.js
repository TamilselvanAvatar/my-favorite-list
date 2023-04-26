import React, { useEffect, useState, useContext } from 'react';
import Rating from '../star/star';
import { useSearch } from '../hooks/useSearch';
import ListContext from '../context/listContext';
import { TbChevronsRight, TbChevronsLeft } from 'react-icons/tb';
import { IoIosArrowDropleft } from 'react-icons/io';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import Spinner from '../spinner/spinner';
export default function List({ term, ...list }) {
  const [imgSrc, searchTerm] = useSearch();
  const [next, setNext] = useState(Math.floor(Math.random() * imgSrc.length));
  const [drop, setDrop] = useState(false);
  const [rate, setRate] = useState(list.rating);
  const [description, setDescription] = useState(list.description);
  const { addObjToList } = useContext(ListContext);
  const image = term && imgSrc[next] ? imgSrc[next] : list.imageUrl;

  const container = `mx-auto my-3  h-24 w-[60%] p-2 box-content border-solid border-2 ${
    term ? 'border-green-1000 shadow-2xl ' : 'border-indigo-600 shadow-lg'
  } shadow-indigo-500/50 rounded`;
  const iconClassName =
    'absolute text-[10px] bottom-0 text-slate-950 cursor-pointer rounded bg-neutral-50';

  useEffect(() => {
    term && searchTerm(term);
  }, [term]);

  const onSaveDetails = () => {
    addObjToList({
      title: term,
      rating: rate || 2,
      imageUrl: imgSrc[next],
      description: description,
    });
    list.newClose(false);
  };

  return (
    <div className={container}>
      <div className=" flex flex-row justify-between items-center relative ">
        <div className="relative h-[98px] w-[98px] ">
          <img
            className="rounded w-[97px] h-[94px] max-w-[100%] object-cover hover:object-scale-down"
            src={
              image ||
              'https://2.bp.blogspot.com/-PFvDOnT0qE8/UhM_tKDGzFI/AAAAAAAAEXo/KJE_-RYhJuk/s1600/6.jpg'
            }
            alt="image"
          />
          {next !== 0 && (
            <TbChevronsLeft
              onClick={() => setNext(next - 1)}
              className={`${iconClassName} left-0`}
            />
          )}
          {next !== imgSrc.length && (
            <TbChevronsRight
              onClick={() => setNext(next + 1)}
              className={`${iconClassName} right-0`}
            />
          )}
        </div>
        <div className="text-lg font-medium italic">
          {term || list.title || 'Title'}
        </div>
        <Rating rate={list.rating} currentRate={setRate} />
        <IoIosArrowDropleft
          onClick={() => setDrop(!drop)}
          className={`absolute hover:text-xl top-0 right-0  flex-none  transition-all ${
            drop ? '-rotate-90' : ''
          }`}
        />
        {list.newClose && (
          <MdOutlineDataSaverOff
            onClick={() => onSaveDetails()}
            title="Save"
            className={`absolute text-red-900 bottom-0 right-0  flex-none `}
          />
        )}
      </div>
      {drop && (
        <textarea
          className={`shadow-lg shadow-indigo-500/50 rounded p-2 text-sm mt-4 transition-all w-[100%]`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide your describtion"
        />
      )}
    </div>
  );
}
