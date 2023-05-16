const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
 
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;
 
  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: "1234",
    });
    const booking = await newbooking.save();
    res.send("Room Booked Successfully")
    
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const {userid} = req.body;
 
  try {
    const bookings = await Booking.find({userid:userid});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
 
module.exports = router;