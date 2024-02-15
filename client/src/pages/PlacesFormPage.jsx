import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";

function PlacesFormPage() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/places/' + id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });

  }, [id])
  

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    e.preventDefault();
    if (id) {
      //update
      await axios.put("/api/places", {
        id, ...placeData
      });

    } else {
      // new place
      await axios.post("/api/places", placeData);
    }
    
    
    navigate("/account/places");
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place.")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title, for example: My Lovely apartment"
        />
        {preInput("Address", "Address to your place.")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        {preInput("Photo", "More = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description for the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in & out times and max guests",
          "add check in and out times, remember to have some time window for cleaning room between guests"
        )}
        <div className="grid sm:grid-cols-4 gap-2">
          <div className="mt-2 -mb-1">
            <h3>Check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="14.00"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="14.00"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Max guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
              placeholder="14.00"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Price</h3>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="100"
              prefix="B"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default PlacesFormPage;
