const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    numberOfGuest: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: {type: Number, required: true}
});

const ReservationModel = mongoose.model('Reservation', ReservationSchema);

module.exports = ReservationModel;