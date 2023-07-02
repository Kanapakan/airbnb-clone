import React from "react";

export default function PlacePhotosModal({ showAllPhotos, onChange, item }) {
  return (
    <>
      {showAllPhotos ? (
        <div className="absolute inset-0 bg-white min-h-screen">
          {/*content*/}
          
          <div className="gap-4 grid p-8">
            <div>
              <button className="bg-white fixed flex z-50" onClick={() => onChange(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* <div> */}
            {/*body*/}
            {item?.photos?.length > 0 &&
              item.photos.map((photo) => (
                <div className="flex h-96 relative justify-self-center">
                  <img
                    className="aspect-[6/3] object-cover px-20"
                    src={`http://localhost:4000/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
