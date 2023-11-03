import { useState } from "react";
import Gallery from "@/components/Gallery.jsx";
function App() {
  const [images, setImages] = useState([
    { id: 0, src: "/assets/images/image-1.webp" },
    { id: 1, src: "/assets/images/image-2.webp" },
    { id: 2, src: "/assets/images/image-3.webp" },
    { id: 3, src: "/assets/images/image-4.webp" },
    { id: 4, src: "/assets/images/image-5.webp" },
    { id: 5, src: "/assets/images/image-6.webp" },
    { id: 6, src: "/assets/images/image-7.webp" },
    { id: 7, src: "/assets/images/image-8.webp" },
    { id: 8, src: "/assets/images/image-9.webp" },
    { id: 9, src: "/assets/images/image-10.jpeg" },
    { id: 10, src: "/assets/images/image-11.jpeg" },
  ]);

  return (
    <div className="">
      <Gallery images={images} setImages={setImages} />
    </div>
  );
}

export default App;
