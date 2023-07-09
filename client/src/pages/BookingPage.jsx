import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WindowContext } from '../windowContext';

export default function BookingPage() {
	const { clientHeight, clientWidth } = useContext(WindowContext);
  const {id} = useParams();
	const [booking, setBooking] = useState(null);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get('/bookings').then((res) => {
			const foundBooking = res.data.find(({_id}) => _id === id);
			if (foundBooking) {
				setBooking(foundBooking);
			}
		})
	
	}, [])
	
  return (
    <div>
      
    </div>
  )
}
