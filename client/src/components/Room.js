import React, { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4 mt-3">
        <img src={room.imageurls[0]} alt="..." className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <p>Parking , Reception , Free Wifi</p>
        <p>
          <b>Max Count : {room.maxcount}</b>
        </p>
        <p>
          <b>Phonenumber : {room.phonenumber}</b>
        </p>
        <p>
          <b>Type : {room.type}</b>
        </p>

        <div style={{ float: "right" }}>
          {(fromdate && todate) && (
            <a href={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-dark m-2">Book Now</button>
            </a>
          )}
          <button className="btn btn-dark m-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="..." />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
