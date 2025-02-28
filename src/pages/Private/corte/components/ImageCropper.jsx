import { useCallback, useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import { CroppedImg } from "~utils/CroppedImg"

export const ImageCropper  = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(300 / 200); // Relación de aspecto cuadrada
  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const aspect = img.width / img.height;
      setAspectRatio(aspect);
    };
  }, [image]);
  const onCropCompleteHandler = useCallback((_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleCrop = async () => {
    // Aquí iría la función para obtener la imagen recortada
    const croppedImage = await CroppedImg(image, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div className="relative w-full h-104 flex flex-col items-center">
      <div className="relative w-[300px] min-h-[80px] h-[300px] bg-gray-900">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
          className="rounded-lg"
        />
      </div>
      {/* 🔹 Toolbar de controles */}
      <div className="flex items-center gap-4 mt-3 bg-gray-800 p-3 rounded-lg">
        <label className="text-white text-sm">Zoom:</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-40 cursor-pointer"
        />
        <span className="text-white">{zoom}x</span>
      </div>
      <button
        onClick={handleCrop}
        className="mt-3 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Recortar
      </button>
    </div>
  );
}