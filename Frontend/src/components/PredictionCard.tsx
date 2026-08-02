type Result = {
  prediction: string | null;
  verdict: string | null;
  confidence: number | null;
  tampered_area_percent: number | null;
};

interface Props {
  result: Result;
}

export default function ResultSection({ result }: Props) {
  const prediction = result.prediction ?? "--/--";
  const verdict = result.verdict ?? "--/--";
  const confidence =
    result.confidence !== null ? `${result.confidence}%` : "--/--";
  const area =
    result.tampered_area_percent !== null
      ? `${result.tampered_area_percent}%`
      : "--/--";

  return (
    <div className="border-2 border-dashed rounded-xl border-white mx-20 p-10">
    <div className="text-[25px] text-white font-bold mb-5">Model Analysis :-</div>
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Prediction */}
        <div className="bg-[#111827] border border-[#23263A] rounded-2xl p-6">
          <p className="text-gray-400 text-[15px] font-bold">Model Prediction</p>

          <h2
            className={`mt-5 text-[15px] font-bold ${
              prediction === "forged"
                ? "text-red-500"
                : prediction === "authentic"
                ? "text-green-400"
                : "text-gray-300"
            }`}
          >
            {prediction.toUpperCase()}
          </h2>
        </div>

        {/* Confidence */}
        <div className="bg-[#111827] border border-[#23263A] rounded-2xl p-6">
          <p className="text-gray-400 text-[15px] font-bold">Confidence</p>

          <h2 className="mt-5 text-[15px] font-bold text-violet-400">
            {confidence}
          </h2>
        </div>

        {/* Forged Area */}
        <div className="bg-[#111827] border border-[#23263A] rounded-2xl p-6">
          <p className="text-gray-400 text-[15px] font-bold">Predicted Forged Area</p>

          <h2 className="mt-5 text-[15px] font-bold text-pink-500">
            {area}
          </h2>
        </div>

        {/* Final Verdict */}
        <div className="bg-[#111827] border border-[#23263A] rounded-2xl p-6">
          <p className="text-gray-400 text-[15px] font-bold">Final Verdict</p>

          <h2
            className={`mt-5 text-[15px] font-bold ${
              verdict === "forged"
                ? "text-red-500"
                : verdict === "authentic"
                ? "text-green-400"
                : "text-gray-300"
            }`}
          >
            {verdict.toUpperCase()}
          </h2>

          {result.verdict !== null && (
            <span
              className={`inline-block mt-4 px-3 py-1 rounded-full text-xs ${
                verdict === "forged"
                  ? "bg-red-500/20 text-red-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {verdict === "forged"
                ? "Forgery Detected"
                : "No Forgery Detected"}
            </span>
          )}
        </div>
      </div>
    </section>
    </div>
  );
}