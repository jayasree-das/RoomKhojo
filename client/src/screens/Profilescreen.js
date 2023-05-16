import React, { useState,useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tabs } from "antd";
import { Tag } from "antd";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="bs">
                <h2>My Profile</h2>
                <br />
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>
                  IsAdmin :{" "}
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        console.log(data);
        setBookings(data);
        setloading(false)
      } catch (error) {
        console.log(error);
        setloading(false)
        seterror(true)
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-6 ml-5">
            {loading && (<Loader/>)}
            {bookings && (bookings.map(booking=>{
                return <div className="bs">
                    <h1>{booking.room}</h1>
                    <h1>BookingId: {booking._id} </h1>
                    <p>
                      <b>CheckIn:</b> {booking.fromdate}
                    </p>
                    <p>
                      <b>CheckOut:</b> {booking.todate}
                    </p>
                    <p>
                      <b>Amount:</b> {booking.totalamount}
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      {booking.status === "booked" ? (
                        <Tag color="green">CONFIRMED</Tag>
                      ) : (
                        <Tag color="red">ERROR</Tag>
                      )}
                    </p>
                </div>
            }))}
        </div>
      </div>
    </div>
  );
}
