import React,{useState} from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:"300px"}}>
      <div className="sweet-loading text-center">

      <BeatLoader
        color="#000"
        loading={true}
        size={30}
      />
    </div>
    </div>
  );
}

export default Loader;
