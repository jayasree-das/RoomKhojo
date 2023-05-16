import React from "react";

function Error({ error }) {
  return (
    <div>
      <div class="alert alert-danger alert-dismissible" role="alert">
        {error}
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

export default Error;
