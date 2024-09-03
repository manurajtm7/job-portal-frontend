import React from "react";

function SelectionBar({ selected, setSelected }) {
  return (
    <section className="w-max  sm:w-[38%] h-max text-black   p-4  flex gap-8   items-center justify-center   shadow-md rounded-xl ">
      <h1 className="text-center  font-semibold ">Community</h1>
      <ul className="flex gap-5  items-center justify-center cursor-pointer ">
        <li
          onClick={() => setSelected(0)}
          className={`"w-full text-center text-black bg-zinc-50 font-semibold px-5 p-1 border  rounded-full hover:border-blue-700 transition-colors cursor-pointer " ${
            !selected && "bg-zinc-100 border-blue-600"
          } `}
        >
          Users
        </li>
        <li
          onClick={() => setSelected(1)}
          className={`"text-center text-black bg-zinc-50 font-semibold  px-5 p-1 border  rounded-full hover:border-blue-700 transition-colors cursor-pointer"  ${
            selected && "bg-zinc-100 border-blue-600"
          } `}
        >
          Chats
        </li>
      </ul>
    </section>
  );
}

export default SelectionBar;
