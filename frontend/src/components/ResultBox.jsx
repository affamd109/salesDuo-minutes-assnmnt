function ResultBox({ result }) {
  return (
    <div className="w-full max-w-xl  bg-[#111111] text-white p-6 mt-6 rounded-xl shadow-xl border border-purple-800">
      <h2 className="text-xl font-semibold mb-2 text-[#8B5CF6]">Processed Output:</h2>
      <pre className="whitespace-pre-wrap  text-sm text-gray-300">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default ResultBox;
