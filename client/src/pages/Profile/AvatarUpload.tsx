import { ImagesIcon } from "../../components/UI/icons/ImagesIcon";

interface AvatarUploadProps {
  displayAvatar?: string | null;
  onFileChange: (file: File) => void;
}

const AvatarUpload = ({ displayAvatar, onFileChange }: AvatarUploadProps) => {
  return (
    <label
      htmlFor="dropzone-file"
      className={`flex flex-col items-center  px-4 sm:px-6 py-4 sm:py-6 h-40 sm:h-60 mx-auto mt-4 sm:mt-6 text-center bg-white rounded-lg cursor-pointer border-1 border-dashed transition-all border-gray-200"
  `}
      //need to add react-easy-crop:
      // https://claude.ai/chat/605588c9-c310-4c3b-b240-6a5442a692a0
      // https://www.youtube.com/watch?v=odscV57kToU
    >
      {displayAvatar ? (
        <div className="w-full  overflow-y-auto ">
          <img
            src={displayAvatar}
            className="w-full h-full object-cover rounded-lg"
            alt="displayAvatar"
          />
        </div>
      ) : (
        <>
          <ImagesIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-[#333333] text-primary mt-2 sm:mt-3" />

          <div>
            <h2 className="mx-2 sm:mx-3 text-sm sm:text-base font-semibold text-gray-700 mt-2 sm:mt-3">
              Upload a profile photo
            </h2>
            <p className="mx-2 sm:mx-3 text-xs sm:text-sm text-gray-400 mt-1">
              Minimum 1600px width recommended. Max 10MB each
            </p>
            <p className="mx-2 sm:mx-3 text-xs sm:text-sm text-gray-400">
              High resolution images (jpeg, jpg, png, webp)
            </p>
          </div>
        </>
      )}

      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileChange(file);
          }
        }}
      />
    </label>
  );
};

export default AvatarUpload;
