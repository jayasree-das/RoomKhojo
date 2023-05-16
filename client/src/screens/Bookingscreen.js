import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen({ match }) {
  const [success, setsuccess] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
        seterror(true);
      }
    };

    fetchData();
  }, []);

  async function bookRoom() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      return;
    }
    console.log("currentUser:", currentUser);

    const bookingDetails = {
      room,
      userid: currentUser._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
    try {
      const result = (
        await axios.post("/api/bookings/bookroom", bookingDetails)
      ).data;
      setsuccess(true);
    } catch (error) {}
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6 my-auto">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt="..." className="bigimg" />
            </div>
            <div className="col-md-6 mt-3">
              <div style={{ textAlign: "right" }}>
                <h1>
                  <strong>Booking Details</strong>
                </h1>
                <hr />
                <b style={{ fontFamily: "Roboto Condensed" }}>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                  </p>
                  <p>From Date : {match.params.fromdate} </p>
                  <p>To Date : {match.params.todate} </p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>
                  <strong>Amount</strong>
                </h1>
                <hr />
                <b style={{ fontFamily: "Roboto Condensed" }}>
                  <p>Total Days:{totaldays} </p>
                  <p>Rent Per Day: {room.rentperday} </p>
                  <p>Total Amount: {totalamount} </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                {success && (
                  <Modal centered autoFocus show={true}>
                    <Modal.Header>
                      <Modal.Title><b>Booking Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h1>Your Payment Is Successful And Your Booking Is Confirmed.<br/>Thank YOu!!!</h1>
                    </Modal.Body>
                    <Modal.Footer>
                      <a href="/profile">
                        <button className="btn btn-dark m-2">
                          Booking Details
                        </button>
                      </a>
                    </Modal.Footer>
                  </Modal>
                )}
                <button className="btn btn-primary mb-4" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
