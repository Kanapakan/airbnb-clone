import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WindowContext } from "../windowContext";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const { clientHeight, clientWidth } = useContext(WindowContext);
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/bookings").then((res) => {
      const foundBooking = res.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="mb-8 sm:mt-0 mt-4 -mx-[2rem] md:-mx-[3rem] lg:-mx-[5rem] xl:-mx-20 md:px-12 lg:px-28 xl:px-44">
      {clientWidth >= 768 && (
        <>
          <h1 className="pt-8 text-2xl">{booking.place.title}</h1>
          <p className="my-2 mb-6">
            <AddressLink>{booking.place.address}</AddressLink>
          </p>
          <div className="p-6 mb-6 bg-gray-100 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Your booking infomation:
              </h2>
              <BookingDates booking={booking} />
            </div>
						<div>
							<div>Total Price</div>
							<div>${booking.price}</div>
						</div>
            
          </div>
        </>
      )}
      <PlaceGallery place={booking.place} />
    </div>
  );
}
