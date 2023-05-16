import React from "react";

function Success({ message }) {
  return (
    <div>
      <div class="alert alert-success alert-dismissible" role="alert">
        {message}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Success;
