import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { RatingView } from "react-simple-star-rating";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("favourites")) {
      const favourites = [];
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } else {
      let data = JSON.parse(localStorage.getItem("favourites"));
      setFavourite(data);
    }
  });

  // function to delete from favourites
  const onDelete = (id) => {
    let data = JSON.parse(localStorage.getItem("favourites"));
    const newList = data.filter((elem) => elem.id != id);
    localStorage.setItem("favourites", JSON.stringify(newList));
    setFavourite(newList);
  };

  return (
    <div>
      <div className="navbar">
        <div className="flex px-4 py-3 justify-between items-center">
          <div className="heading text-white text-semibold text-3xl">
            <div className="flex gap-4 items-center">
              <Link to="/">
                <div className="flex gap-2 items-center">
                  <h1 className="text-red-800 hidden md:block">MovieGoons</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-red-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </Link>
              <div className="paths">
                <Link to="/favourites">
                  <h1 className="text-lg text-gray-700">Favourites</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid -mt-16 grid-cols-3 md:grid-cols-6 gap-5 mx-4 mt-4">
        {favourite.map((j) => {
          return (
            <Fade>
              <div key={j.id} className="mt-20 mb-16 rounded-lg">
                <img
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  src={j.image}
                  alt={j.type}
                />
                <div
                  className="w-full rounded-b-lg"
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  <div className="flex items-center justify-center p-5">
                    <div>
                      <p className="text-white text-center text-sm">
                        {j.title}
                      </p>
                      <p className="text-gray-300 text-center text-xs">
                        {j.year}
                      </p>
                      <div className="ratings flex w-full mt-2 justify-center">
                        <div>
                          <RatingView ratingValue={j.ratings} />
                          <div className="comment">
                            <p className="text-sm text-center text-gray-300">
                              {j.comment}
                            </p>
                          </div>
                          <button
                            onClick={() => onDelete(j.id)}
                            className="text-gray-100 hover:text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>

      {favourite.length === 0 ? (
        <div className="flex justify-center mt-20">
          <h1 className="text-2xl text-white text-center">
            No favourites added
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Favourites;
