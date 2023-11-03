import React from "react";
import { useDrop } from "react-dnd";

const DroppableImage = ({
  image,
  isLarge = false,
  isSelected = false,
  onToggleSelection,
}) => {
  const [, drop] = useDrop({
    accept: "IMAGE", // Specify the type of item that can be dropped
    drop: (item, monitor) => {
      const droppedImageId = item.id;
      // You can handle the drop event here, such as reordering images or other actions
      console.log(`Dropped image ID: ${droppedImageId}`);
    },
  });

  return (
    <div
      ref={drop}
      className={`relative p-2 group border border-1 rounded-lg border-gray-300 ${
        isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
      onClick={() => onToggleSelection()}
    >
      <img
        src={image.src}
        className={`w-full object-cover rounded-lg ${
          isSelected ? "opacity-50" : ""
        }`}
      />
      <div
        className={`absolute inset-0 group-hover:bg-[rgba(0,0,0,0.6)] opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity ${
          isSelected ? "bg-[rgba(200, 200, 200, .6)] opacity-100" : ""
        }`}
      >
        <input
          type="checkbox"
          className={`w-6 h-6 accent-blue-900 absolute top-5 left-5`}
          checked={isSelected}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default DroppableImage;
