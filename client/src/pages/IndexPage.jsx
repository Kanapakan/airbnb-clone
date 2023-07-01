import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// import { Link } from "react-router-dom"

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  }, [])
  
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8'>
      {places.length > 0 && places.map(place => (
        <Link key={place._id} to={'/place/' + place._id}>
          <div className="bg-gray-500 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </div>
          <h3 className='font-medium mt-3'>{place.address}</h3>
          <h2 className='text-sm text-gray-500 truncate'>{place.title}</h2>
          <div className='mt-1'>
            <span className='font-semibold'>${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage;
