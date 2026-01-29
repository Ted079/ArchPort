import { useEffect, useState } from "react";

const ImagePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const generatedUrl = URL.createObjectURL(file);
    setUrl(generatedUrl);

    return () => {
      URL.revokeObjectURL(generatedUrl);
    };
  }, [file]);

  if (!url) return null;
   

  return (
    <div className="relative group w-32 h-32">
      <img
        src={url}
        className="w-full h-full object-cover rounded-lg"
        alt="preview"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImagePreview;
