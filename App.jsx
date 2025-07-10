import { useState } from "react";

function App() {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [line, setLine] = useState(9);
  const [prediction, setPrediction] = useState(null);

  const predict = async (e) => {
    e.preventDefault();
    const res = await fetch("https://your-backend-url.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ home, away, line }),
    });
    const data = await res.json();
    setPrediction(data.predicted_total);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">MLB Run Predictor</h1>
      <form onSubmit={predict} className="grid gap-2">
        <input className="border p-2" value={home} onChange={e => setHome(e.target.value)} placeholder="Home Team" />
        <input className="border p-2" value={away} onChange={e => setAway(e.target.value)} placeholder="Away Team" />
        <input className="border p-2" type="number" value={line} onChange={e => setLine(+e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded">Predict</button>
      </form>
      {prediction && <p className="mt-4 text-lg">Predicted Total: <strong>{prediction}</strong></p>}
    </div>
  );
}

export default App;