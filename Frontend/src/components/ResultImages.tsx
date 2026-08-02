type Result = {
  ela_png_base64: string |null;
  mask_png_base64: string |null;
  overlay_png_base64: string|null;
};

export default function ResultImages({
  result,
}: {
  result: Result;
}) {
  return (
    <div className="border-2 border-white mx-20 mt-10 p-10 rounded-xl border-dashed text-white">
     <div className="text-[25px] text-white font-bold"> Image Analysis</div>
    <div className="flex justify-center flex-wrap gap-10 mt-12">

      {/* ELA */}

      <div className="bg-[#111827] rounded-2xl shadow-xs shadow-white p-5">

        <h2 className="font-semibold text-xl mb-4">
          ELA Image
        </h2>

        <img
          src={`data:image/png;base64,${result.ela_png_base64}`}
          className="rounded-xl w-full"
        />

      </div>

      

        {/* Mask */}

        <div className="bg-[#111827] rounded-2xl shadow-xs shadow-white p-5">

          <h2 className="font-semibold text-xl mb-4">
            Predicted Mask
          </h2>

          <img
            src={`data:image/png;base64,${result.mask_png_base64}`}
            className="rounded-xl w-full"
          />

        </div>

        {/* Overlay */}

        <div className="bg-[#111827] rounded-2xl shadow-xs shadow-white p-5">

          <h2 className="font-semibold text-xl mb-4">
            Overlay
          </h2>

          <img
            src={`data:image/png;base64,${result.overlay_png_base64}`}
            className="rounded-xl w-full"
          />

        </div>

    

    </div>
    </div>
  );
}