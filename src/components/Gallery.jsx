import { useState } from "react";
import SingleImage from "@/components/SingleImage.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Gallery = ({ images, setImages }) => {
  //states
  const [selectedImages, setSelectedImages] = useState([]);

  //handler functions
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

    // Ensure the first image is always the featured image
    if (targetIndex === 0 || sourceIndex === 0) {
      const [featuredImage] = updatedImages.splice(targetIndex, 1);
      updatedImages.unshift(featuredImage);
    }

    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 p-6 md:p-10">
        <div className="relative bg-white rounded-lg">
          {selectedImages.length > 0 ? (
            <div className="py-6  px-6 md:px-10">
              <div className="flex justify-between">
                <div className="font-bold text-2xl flex gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-800 h-6 w-6"
                    checked={selectedImages.length > 0}
                    onChange={() => {}}
                  />
                  {selectedImages?.length} files selected
                </div>
                <button
                  className="text-red-600 font-semibold hover:underline text-lg border-0 bg-transparent"
                  onClick={handleDeleteSelected}
                >
                  Delete files
                </button>
              </div>
            </div>
          ) : (
            <h5 className="pl-6 md:pl-10 py-6 font-bold text-2xl">Gallery</h5>
          )}
          <hr className="border-t border-gray-300 border-2" />
          <div className="border-b-gray-500 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-10 px-6 md:px-10 gap-6">
            {images?.map((image, index) => (
              <SingleImage
                key={image?.id}
                image={image}
                isLarge={index === 0} //first image will be set as featured image
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
                className="flex flex-col m-3 items-center justify-center border border-1 border-gray-400 border-dashed bg-gray-100 rounded-lg cursor-pointer py-10 lg:py-7 xl:py-10"
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
      </div>
    </DndProvider>
  );
};

export default Gallery;
