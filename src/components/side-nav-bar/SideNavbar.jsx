import React from "react";
import * as IconList from "lucide-react";

function SideNavbar({ currentSelected, setCurrentSelected }) {
  const dashboardLinks = [
    { link: "Profile", icon: IconList["UserRound"] },
    { link: "Job alerts", icon: IconList["MessageCircleWarning"] },
    { link: "Post job", icon: IconList["BetweenHorizontalStart"] },
    { link: "requests", icon: IconList["BellRing"] },
  ];
  const handleClick = (index) => {
    localStorage.setItem("side-link", index);
    setCurrentSelected(index);
  };
  return (
    <div className="w-max  sm:w-[13%] bg-white px-2 sm:px-0 flex flex-col items-center justify-center shadow">
      <ul className="w-full h-4/5  mt-5 flex flex-col gap-5 items-center   p-2">
        {dashboardLinks.map((data, index) => {
          const IconComponent = data.icon;
          return (
            <li
              key={index}
              onClick={() => handleClick(index)}
              className={`" w-4/5 py-3  hover:bg-gradient-to-tr text-center   ${
                index === currentSelected &&
                " text-blue-600 font-semibold border-b-blue-700 sm:translate-x-3"
              }  sm:hover:translate-x-3   flex gap-3   transition-all cursor-pointer  "`}
            >
              <span>{<IconComponent />}</span>
              <p className="hidden sm:block">{data.link}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideNavbar;
