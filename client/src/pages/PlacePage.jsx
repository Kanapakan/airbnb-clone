import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReserveWidget from "../components/ReserveWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import { WindowContext } from "../windowContext";

function PlacePage() {
  const { clientHeight, clientWidth } = useContext(WindowContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
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


  return (
    <div className="sm:mt-0 mt-4 -mx-[2rem] md:-mx-[3rem] lg:-mx-[5rem] xl:-mx-20 md:px-12 lg:px-28 xl:px-44">
      {clientWidth >= 768 && (
        <>
          <h1 className="pt-8 text-2xl">{place.title}</h1>
          <p className="my-2 mb-6">
           <AddressLink>{place.address}</AddressLink>
          </p>
        </>
      )}
      <PlaceGallery place={place}/>
      <div className="mt-8 my-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 sm:px-6 md:px-0">
        <div>
          <h1 className="text-2xl">{place.title}</h1>
          <div className="flex gap-2 mt-2 items-center">
            <p className="font-light">{place.maxGuests} guests</p>
            <span>&#183;</span>
            <AddressLink>{place.address}</AddressLink>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
          <p className="text-md line-clamp-5 font-light">{place.description}</p>
          <div
            className="flex gap-1 cursor-pointer w-fit"
            onClick={() => setShowMore(true)}
          >
            <p className="my-3 underline">Show more </p>
            <p className="self-center text-lg ">{">"}</p>
          </div>
        </div>
        {showMore ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[90] outline-none focus:outline-none">
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
        <div>
          <ReserveWidget place={place} />
        </div>
      </div>
      <hr className="sm:px-6 md:px-0 h-px mt-10 bg-gray-200 border-0 dark:bg-gray-300" />
      <div className="sm:px-6 md:px-0 py-8">
          <div>
            <h2 className="text-xl font-semibold">Extra info</h2>
          </div>
          <div className="mb-4 mt-2  text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  );
}

export default PlacePage;
