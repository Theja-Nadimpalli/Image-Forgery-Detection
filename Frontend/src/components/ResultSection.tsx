export default function ResultSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mt-10">

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-6">
        Detection Result
      </h2>

      {/* Result Card */}
      <div className="border rounded-xl p-6 grid grid-cols-3 gap-6 items-center">

        <div>
          <p className="text-gray-500 text-sm">
            Prediction
          </p>

          <h3 className="text-red-500 text-4xl font-bold mt-2">
            FORGED
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Confidence Score
          </p>

          <h3 className="text-red-500 text-4xl font-bold mt-2">
            97.23%
          </h3>
        </div>

        <div>
          <p className="text-gray-700">
            This image is likely to be
          </p>

          <span className="text-red-500 font-bold">
            FORGED
          </span>

          <p className="text-gray-500 mt-2 text-sm">
            Our model has detected manipulated regions.
          </p>
        </div>

      </div>

      {/* Analysis Section */}
      <h3 className="text-xl font-semibold mt-10 mb-5">
        Analysis Results
      </h3>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Original Image */}
        <div className="border rounded-xl overflow-hidden">

          <div className="p-4 font-medium">
            1. Original Image
          </div>

          <img
            src="https://picsum.photos/400/300"
            alt=""
            className="w-full h-64 object-cover"
          />

        </div>

        {/* ELA */}
        <div className="border rounded-xl overflow-hidden">

          <div className="p-4 font-medium">
            2. ELA Visualization
          </div>

          <img
            src="https://picsum.photos/401/300"
            alt=""
            className="w-full h-64 object-cover"
          />

          <p className="p-4 text-sm text-gray-500">
            Brighter areas indicate higher compression
            error and possible tampering.
          </p>

        </div>

        {/* Localization */}
        <div className="border rounded-xl overflow-hidden">

          <div className="p-4 font-medium">
            3. Forgery Localization
          </div>

          <img
            src="https://picsum.photos/402/300"
            alt=""
            className="w-full h-64 object-cover"
          />

          <p className="p-4 text-sm text-gray-500">
            Red regions show detected forged areas.
          </p>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 border rounded-xl mt-8 p-6">

        <div>
          <p className="font-medium">
            Analysis Time
          </p>

          <p className="text-gray-500">
            2.45 sec
          </p>
        </div>

        <div>
          <p className="font-medium">
            Model Used
          </p>

          <p className="text-gray-500">
            DenseNet201 + ELA
          </p>
        </div>

        <div>
          <p className="font-medium">
            Dataset
          </p>

          <p className="text-gray-500">
            CASIA 2.0
          </p>
        </div>

        <div>
          <p className="font-medium">
            Accuracy
          </p>

          <p className="text-gray-500">
            95%+
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-8">

        <button
          className="
          flex-1
          border
          border-indigo-600
          text-indigo-600
          py-3
          rounded-lg
          font-medium
        "
        >
          Analyze Another Image
        </button>

        <button
          className="
          flex-1
          bg-indigo-600
          text-white
          py-3
          rounded-lg
          font-medium
        "
        >
          Download Result
        </button>

      </div>

    </div>
  );
}