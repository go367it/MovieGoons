import React, { Fragment, useState } from "react";
import Fade from "react-reveal/Fade";
import { Dialog, Transition } from "@headlessui/react";
import { Rating } from "react-simple-star-rating";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";

export function Favourite(props) {
  let [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('')

  function closeModal() {

    if(rating >  0 && comment!== ''){

      const data = {
        id: props.id,
        title: props.title,
        image: props.image,
        year: props.year,
        ratings: rating,
        comment: comment
      }

      let favourite = JSON.parse(localStorage.getItem('favourites'))
      favourite.push(data)
      console.log(favourite)
      localStorage.setItem('favourites',JSON.stringify(favourite))
      setIsOpen(false);
      return cogoToast.success(`${props.title} added to favourites`, {
        position: "bottom-left",
      })

      
    }
    setIsOpen(false);

  }

  function openModal() {
    setIsOpen(true);
  }

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block bg-gray-900 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex">
                    <textarea 
                    className="h-16 w-full mt-4 text-gray-300 outline-none bg-gray-900"
                    placeholder='Comment...'
                    value={comment}
                    onChange={(event)=>setComment(event.target.value)}
                    />
                  </div>
                  <div className="flex my-2 justify-center">
                    <Rating onClick={handleRating} ratingValue={rating} />
                  </div>
                </div>

                <div className="mt-4 w-full flex justify-end">
                  <button
                    type="button"
                    className="px-4 outline-none py-2 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transform duration-500"
                    onClick={closeModal}
                  >
                    Add to favourite
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const movieList = (props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mx-4 mt-4">
      {props.movies.map((j) => {
        return (
          <Fade>
            <div key={j.imdbID} className="mt-20 mb-16 rounded-lg">
              <Link to={`/movie/${j.imdbID}`}>
              <img
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                src={j.Poster}
                alt={j.Type}
              />
              </Link>
              <div
                className="w-full rounded-b-lg"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <div className="flex items-center justify-center p-5">
                  <div>
                    <p className="text-white text-center text-sm">{j.Title}</p>
                    <p className="text-gray-300 text-center text-xs">
                      {j.Year}
                    </p>
                    <div className="ratings flex w-full mt-2 justify-center">
                      <Favourite
                        id={j.imdbID}
                        title={j.Title}
                        image={j.Poster}
                        year={j.Year}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        );
      })}
    </div>
  );
};

export default movieList;
