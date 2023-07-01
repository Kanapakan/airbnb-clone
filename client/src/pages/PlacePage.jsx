import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacePhotosModal from "../components/PlacePhotosModal";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";
  // console.log(place.photos.length);

  if (showAllPhotos) {
    return (
      <PlacePhotosModal
        showAllPhotos={showAllPhotos}
        onChange={setShowAllPhotos}
        item={place}
      />
    );
  }
  //   if (showMore) {
  //     console.log("show");
  //     return (

  //     );
  //   }

  return (
    <div className="py-8 bg-gray-100 mt-4 -mx-[2rem] sm:-mx-[2rem] xl:-mx-20  px-20 md:px-24 lg:px-28 xl:px-44">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="block my-2 underline text-sm"
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
      >
        {place.address}
      </a>
      <div className="mt-6 relative">
        <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-xl overflow-hidden">
          <div className="grid">
            <div className="flex">
              {place.photos?.[0] && (
                <img
                  className="aspect-[5/3] object-cover"
                  src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-[5/3] object-cover"
                src={`http://localhost:4000/uploads/${place.photos?.[1]}`}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-[5/3] object-cover relative top-2"
                  src={`http://localhost:4000/uploads/${place.photos?.[2]}`}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-3 right-3 py-1 px-3 bg-white rounded-lg border border-black cursor-pointer hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Show more
        </button>
      </div>
      <div className="my-4 grid grid-cols-[2fr_1fr] gap-14">
        <div className="mt-5">
          <h1 className="text-2xl">{place.title}</h1>
          <p className="font-light mt-4">{place.maxGuests} guests</p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
          <p className="text-md line-clamp-3 font-light">{place.description}</p>
          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => setShowMore(true)}
          >
            <h3 className="my-3 underline">Show more </h3>
            <h2 className="self-center text-lg ">{">"}</h2>
          </div>
        </div>
        {showMore ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto xl:max-w-3xl max-w-3xl max-h-3xl">
                {/*content*/}
                <div className="h-[600px] max-w-3xl border-0 rounded-lg shadow-[0_0px_40px_5px_rgba(0,0,0,0.3)] relative flex flex-col bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 rounded-t">
                    <button
                      className="bg-transparent border-0 text-black left-0 text-3xl leading-none "
                      onClick={() => setShowMore(false)}
                    >
                      <span className="text-gray-600 h-6 w-6 text-2xl block outline-none focus:outline-none font-light">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="pb-6 pl-6 flex-auto overflow-scroll">
                    <div className="mt-2 overflow-scroll">
                      <h1 className="text-2xl font-semibold">
                        About this space
                      </h1>
                      <p className="mt-4 pr-8 text-black text-md leading-relaxed font-light">
					  	{place.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div>b</div>
      </div>
    </div>
  );
}

export default PlacePage;
