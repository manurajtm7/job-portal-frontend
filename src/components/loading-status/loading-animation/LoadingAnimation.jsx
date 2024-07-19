import React from "react";

function LoadingAnimation() {
  return (
    <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* <div className="w-16 h-16 border-8 border-b-blue-600 border-blue-200  rounded-full animate-spin "></div> */}
      <div class="rounded-full h-20 w-20 bg-blue-700 animate-ping"></div>
    </div>
  );
}

export default LoadingAnimation;
