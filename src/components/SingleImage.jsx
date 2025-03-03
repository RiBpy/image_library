import { useDrag, useDrop } from "react-dnd";

const SingleImage = ({ image, isLarge, isSelected, onToggleSelection, handleDrop, index }) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        handleDrop(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`relative ${isLarge ? "col-span-2 row-span-2" : ""}`}
    >
      <img src={image.src} alt="" className="w-full h-full object-cover" />
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelection}
        className="absolute top-2 right-2"
      />
    </div>
  );
};

export default SingleImage;
