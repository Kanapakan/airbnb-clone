import React, { useContext, useState } from 'react'
import PlaceImg from './PlaceImg';
import PlacePhotosModal from './PlacePhotosModal';
import { WindowContext } from '../windowContext';

export default function PlaceGallery({place}) {
  const { clientHeight, clientWidth } = useContext(WindowContext);
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	if (showAllPhotos) {
			return (
				<PlacePhotosModal
					showAllPhotos={showAllPhotos}
					onChange={setShowAllPhotos}
					item={place}
				/>
			);
		}

  return (
    <div className="relative">
        <div className="md:grid md:grid-cols-[2fr_1fr] gap-2 rounded-xl md:overflow-hidden">
          <div className="grid">
            <div className="flex">
              {place.photos?.[0] && (
                <div onClick={() => setShowAllPhotos(true)}>
                  <PlaceImg className={'cursor-pointer aspect-[5/3] object-cover w-[741px] h-auto'} place={place} index={0}/>
                </div>
              )}
            </div>
          </div>
          {clientWidth >= 768 && (
            <div className="grid">
              {place.photos?.[1] && (
                <div onClick={() => setShowAllPhotos(true)}>
                  <PlaceImg className={'cursor-pointer aspect-[5/3] object-cover'} place={place} index={1}/>
                </div>
              )}
              <div className="overflow-hidden">
                {place.photos?.[2] && (
                  <div onClick={() => setShowAllPhotos(true)}>
                    <PlaceImg className={'cursor-pointer aspect-[5/3] object-cover relative top-2'} place={place} index={2}/>
                  </div>
                )}
              </div>
            </div>
          )}
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
  )
}
