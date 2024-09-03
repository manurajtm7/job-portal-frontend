// import React from "react";

// function LoadingAnimation() {
//   return (
//     <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//       {/* <div className="w-16 h-16 border-8 border-b-blue-600 border-blue-200  rounded-full animate-spin "></div> */}
//       <div class="rounded-full h-10 w-10 bg-blue-700 animate-ping grid place-items-center">
//         <div class="rounded-full h-8 w-8 bg-transparent border-2 border-cyan-600 animate-ping"></div>
//       </div>
//     </div>
//   );
// }

// export default LoadingAnimation;

//? loading animation two

import React from "react";

function LoadingAnimation() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-10 h-10 border-2 border-zinc-400 border-b-zinc-600 rounded-full animate-spin "></div>
    </div>
  );
}

export default LoadingAnimation;
