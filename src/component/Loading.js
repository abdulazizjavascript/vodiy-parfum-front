import React from 'react'
import ClipLoader from "react-spinners/BounceLoader";

const Loading = ({loading}) => {
  return (
    <div
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader color={"#15153D"} loading={loading} size={150} />
    </div>
  );
}

export default Loading
