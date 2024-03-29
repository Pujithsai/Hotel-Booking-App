const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    maxGuests: Number,
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
    
    
});

const BookingModel = mongoose.model('Booking',bookingSchema);


module.exports = BookingModel;