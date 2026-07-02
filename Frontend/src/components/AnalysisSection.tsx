interface Result {
  original_image: string | null;
  ela_image: string | null;
}

export default function AnalysisSection(props: Result) {
  return (
    <div className="mt-10 mx-20">
      <h2 className="text-xl font-semibold mb-5">
        Analysis Results
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Original Image */}
        <div className="border rounded-xl overflow-hidden bg-white">
          <div className="p-4 font-medium">
            1. Original Image
          </div>

          {props?.original_image ? (
            <img
              src={props.original_image}
              alt="Original"
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="h-72 flex items-center justify-center bg-gray-50">
              <p className="text-gray-400">
                No image available. Upload the image.
              </p>
            </div>
          )}
        </div>

        {/* ELA Image */}
        <div className="border rounded-xl overflow-hidden bg-white">
          <div className="p-4 font-medium">
            2. ELA Visualization
          </div>

          {props?.ela_image ? (
            <img
              src={props.ela_image}
              alt="ELA"
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="h-72 flex items-center justify-center bg-gray-50">
              <p className="text-gray-400">
                Upload image and analyze to see ELA visualization
              </p>
            </div>
          )}

          <p className="p-4 text-sm text-gray-500">
            Brighter areas indicate higher compression error and possible tampering.
          </p>
        </div>

      </div>
    </div>
  );
}