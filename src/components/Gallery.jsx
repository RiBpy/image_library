import { useState } from "react";
import SingleImage from "@/components/SingleImage.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Gallery = ({ images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (index) => {
    const isImageSelected = selectedImages.includes(index);
    if (isImageSelected) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = images?.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newImages.push({ id: images.length + i + 1, src: imageUrl });
    }
    setImages([...images, ...newImages]);
  };

  const handleDrop = (sourceIndex, targetIndex) => {
    if (sourceIndex === targetIndex) {
      return;
    }

    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <div className="py-8 border-b border-b-gray-500 px-6">
          <div className="flex justify-between">
            <div className="font-semibold flex gap-2">{/* ... */}</div>
            <button
              className="text-red-600 border-0 bg-transparent"
              onClick={handleDeleteSelected}
            >
              Delete files
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-10 px-6 gap-6">
          {images?.map((image, index) => (
            <SingleImage
              key={image?.id}
              image={image}
              isLarge={index === 0} // Set isLarge to true for the first image
              isSelected={selectedImages.includes(image.id)}
              onToggleSelection={() => handleImageClick(image.id)}
              handleDrop={handleDrop}
              index={index}
              images={images}
              setImages={setImages}
            />
          ))}
          <label
            htmlFor="image-upload"
            className="flex flex-col m-3 items-center justify-center border border-1 border-gray-400 border-dashed bg-gray-100 rounded-lg cursor-pointer py-10 lg:py-20"
          >
            <img src="/assets/icons/photo.png" className="w-7 h-7" alt="" />
            <span className="mt-2">Add images</span>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Gallery;