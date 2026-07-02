interface PredictionProps {
  prediction: string | null;
  confidence: number | null;
}

export default function PredictionCard({
  prediction,
  confidence,
}: PredictionProps) {
  const hasResult = prediction !== null;

  return <div className="bg-purple-50">
    <div className="border rounded-xl p-8 flex justify-between items-center 
    mx-20 bg-gray-50 px-20">

      <div>
        <p className="text-black font-semibold mb-1 text-[20px]">
          Prediction
        </p>

        <h2
          className={`text-[15px] font-bold ${
            prediction === "FORGED"
              ? "text-red-500"
              : prediction === "AUTHENTIC"
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {prediction || "Waiting for Analysis..."}
        </h2>
      </div>

      {/* Confidence */}
      <div>
        <p className="text-black font-semibold mb-1 text-[20px]">
          Confidence Score
        </p>

        <h2
          className={`text-[15px] font-bold ${
            hasResult
              ? "text-indigo-600"
              : "text-gray-400"
          }`}
        >
          {confidence !== null
            ? `${confidence.toFixed(2)}%`
            : "--"}
        </h2>
      </div>

      {/* Description */}
      <div>
        <p className="text-[17px] text-gray-700">
          This image is likely to be
        </p>

        <p
          className={`font-bold  ${
            prediction === "FORGED"
              ? "text-red-500"
              : prediction === "AUTHENTIC"
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {prediction || "--"}
        </p>

        <p className="text-gray-500 mt-3">
          {hasResult
            ? prediction === "FORGED"
              ? "Our model has detected manipulated regions."
              : "Our model found no signs of tampering."
            : "Upload an image and click Analyze Image."}
        </p>
      </div>

    </div>
  </div>;
}