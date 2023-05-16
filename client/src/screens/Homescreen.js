import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import 'antd/dist/antd.min.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
function Homescreen() {
  const [hotels, sethotels] = useState();
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [fromdate,setfromdate] = useState();
  const [todate,settodate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const rooms = (await axios.get("/api/rooms/getallrooms")).data;
        sethotels(rooms);
        setDuplicateRooms(rooms);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

function filterByDate(dates){
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))
}

function filterBySearch() {
  const tempRooms = duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()));
  sethotels(tempRooms);
}

  return (
    <div className="container">

    <div className="row mt-5">
      <div className="col-md-4" style={{backgroundColor:'#1a1a1a', marginLeft:'17%'}}>
        <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
      </div> 
      <div className="col-md-4" style={{backgroundColor:'#1a1a1a'}}>
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
    </div>
      <div className="row justify-content-center mt-6">
        {loading ? (
          <Loader/>
        ) : (
          hotels?.map((room) => {
            return (
              <div className="col-md-9 mt-5">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;

