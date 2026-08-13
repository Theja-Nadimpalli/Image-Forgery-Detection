import { useState } from "react";
import axios from "axios";

interface UploadSectionProps {
  result: {
  prediction: string | null;
  verdict: string | null;
  confidence: number | null;
  threshold: number | null;
  tampered_area_percent: number | null;
  p_forged: number | null;
  ela_png_base64: string | null;
  mask_png_base64: string | null;
  overlay_png_base64: string | null;
  };

  setResult: (x: any) => void;
}



export default function UploadSection(props: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAnalyze = async () => {
  if (!selectedFile) {
    alert("Please select an image first");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);

  try {
    const response = await axios.post(
      "http://localhost:5000/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }


    );

    console.log(response.data);
    props.setResult(response.data);

  } catch (error) {
    console.error(error);
  }
};

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return <div className="bg-black pb-5">
    <div className="w-full max-w-2xl mx-auto py-5">
      <label
        htmlFor="file-upload"
        className="
          flex flex-col items-center justify-center
          h-80
          border-2 border-dashed border-white
          rounded-xl
          bg-black
          cursor-pointer
          hover:bg-gray-800
          transition
        "
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded-lg object-contain mb-4"
            />

            <p className="font-medium text-white">
              {selectedFile?.name}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Click to choose another image
            </p>
          </>
        ) : (
          <>
            <svg
              className="w-12 h-12 text-indigo-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
              />
            </svg>

            <p className="text-white font-medium">
              Drag & Drop your image here
            </p>

            <p className="text-white text-sm my-2">
              or
            </p>

            <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
              Browse Image
            </span>

            <p className="mt-4 text-xs text-gray-500">
              Supported formats: JPG, JPEG, PNG | Max size: 10MB
            </p>
          </>
        )}

        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
    <div className="flex items-center justify-center hover:cursor-pointer">
        <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm" onClick={handleAnalyze}>
              Analyze Image
            </span>
    </div>
    </div>
  ;
}

