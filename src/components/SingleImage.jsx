import { useDrag, useDrop } from "react-dnd";

const SingleImage = ({
  image,
  isLarge = false,
  isSelected = false,
  onToggleSelection,
  index,
  handleDrop
}) => {
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { id: image.id, type: "IMAGE" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    drop: (draggedItem) => {
      const sourceIndex = draggedItem.id;
      const targetIndex = index;
      if (sourceIndex !== null && targetIndex !== null) {
        handleDrop(sourceIndex, targetIndex);
        draggedItem.index = targetIndex;
      }
    },
  });


  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative p-2 group border border-1 rounded-lg border-gray-300 ${
        isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
      onClick={() => onToggleSelection()}
    >
      <img
        src={image?.src}
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

export default SingleImage;
