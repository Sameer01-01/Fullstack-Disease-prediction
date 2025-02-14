import React, { useState } from "react";
import axios from "axios";

const diseaseOptions = {
  diabetes: {
    title: "Diabetes Prediction",
    apiUrl: "http://localhost:8000/predict-diabetes",
    fields: ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"],
  },
  heart: {
    title: "Heart Disease Prediction",
    apiUrl: "http://localhost:8000/predict-heart-disease",
    fields: ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"],
  },
  parkinsons: {
    title: "Parkinson's Prediction",
    apiUrl: "http://localhost:8000/predict-parkinsons",
    fields: ["fo", "fhi", "flo", "Jitter_percent", "Jitter_Abs", "RAP", "PPQ", "DDP", "Shimmer", "Shimmer_dB", "APQ3", "APQ5", "APQ", "DDA", "NHR", "HNR", "RPDE", "DFA", "spread1", "spread2", "D2", "PPE"],
  },
};

function App() {
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(diseaseOptions[selectedDisease].apiUrl, formData);
      setResult(response.data.prediction);
    } catch (error) {
      setResult("Error in prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Health Assistant</h1>

      {/* Dropdown for disease selection */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select a Disease:</label>
        <select
          className="p-2 border rounded w-64"
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
        >
          <option value="diabetes">Diabetes</option>
          <option value="heart">Heart Disease</option>
          <option value="parkinsons">Parkinson's</option>
        </select>
      </div>

      {/* Form for Input Fields */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{diseaseOptions[selectedDisease].title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {diseaseOptions[selectedDisease].fields.map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              placeholder={field}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          ))}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
        {result && <p className="mt-4 text-lg font-bold">{result}</p>}
      </div>
    </div>
  );
}

export default App;
