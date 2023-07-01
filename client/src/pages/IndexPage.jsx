import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
// import { Link } from "react-router-dom"

function IndexPage() {
  const { ready, user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [save, setSave] = useState(false);
  const [savedPlace, setSavedPlace] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });

    axios.get("/profile").then(({ data }) => {
      setSavedPlace(data.savePlaces);
    });
  }, []);

  async function savePlace(id) {
    let savedPlaceAll = []; 
    let indetPlace = savedPlace.indexOf(id);
    if (indetPlace >= 0) {
      savedPlaceAll = [...savedPlace]
      savedPlaceAll.splice(indetPlace, 1);
    } else {
      savedPlaceAll = [...savedPlace, id]
    }
    console.log(savedPlaceAll);
    setSavedPlace(savedPlaceAll);
    await axios.put("/bookmark", { savedPlaceAll });
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <div className="relative">
            <button
              className="absolute bg-transparent right-0 p-2 cursor-pointer"
              onClick={() => savePlace(place._id)}
            >
              {
                savedPlace && savedPlace.indexOf(place._id) >= 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#F53850"
                    className="w-7 h-7"
                    strokeWidth={1.0}
                    stroke="white"
                  >
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 24 24"
                    strokeWidth={1.0}
                    stroke="white"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )

                //   : (
                //     <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth={1.0} stroke="white" className="w-7 h-7">
                //       <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                //     </svg>
                //     // <h1>No</h1>
                //   )
                // }
                // )
              }
            </button>

            <Link key={place._id} to={"/place/" + place._id}>
              <div className="bg-gray-500 rounded-2xl flex ">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h3 className="font-medium mt-3">{place.address}</h3>
              <h2 className="text-sm text-gray-500 truncate">{place.title}</h2>
              <div className="mt-1">
                <span className="font-semibold">${place.price}</span> per night
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default IndexPage;
