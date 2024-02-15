import axios from "axios";
import { differenceInBusinessDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function ReserveWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
	const navigate = useNavigate();
	const {user} = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user])
	
	
  let numberOfNight = 0;

  if (checkIn && checkOut) {
    numberOfNight = differenceInBusinessDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function reserveThisPlace() {
		const response = await axios.post('/api/bookings', {checkIn, checkOut, numberOfGuest, name, phone,
			place: place._id,
			price: numberOfNight * place.price
		});
		const bookingId = response.data._id;
		navigate(`/account/bookings/${bookingId}`)
	}

  return (
    <div>
      <div className="bg-white shadow-xl border border-gray-200 p-4 rounded-2xl min-w-max">
        <div className="text-center flex gap-[0.4rem]">
          <p className="text-lg font-semibold">฿{place.price}</p>
          <p className="font-light self-center">night</p>
        </div>
        <div className="border rounded-2xl mt-5">
          <div className=" grid grid-cols-2">
            <div className="py-3 px-4">
              <label className="font-semibold text-sm">Check-in:</label>
              <br />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check-out:</label>
              <br />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
            />
          </div>
          {numberOfNight > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          onClick={reserveThisPlace}
          className="primary mt-6 text-lg cursor-pointer"
        >
          Reserve
          {numberOfNight > 0 && <span>{numberOfNight * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
