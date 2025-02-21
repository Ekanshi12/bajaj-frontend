import { useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function App() {
  const [jsonInput, setJsonInput] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Dropdown Options
  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" }
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("https://bajaj-backend-eta-eight.vercel.app/", parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Invalid JSON or API error", error);
      alert("Invalid JSON or API error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-zinc-900">
      
      <div className="w-full max-w-md">
        <label className="block text-zinc-500 font-bold mb-2">API Input</label>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-md bg-zinc-300 p-5 shadow-lg rounded-md">
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-md mt-3">
        <button
          className="w-full bg-zinc-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Multi-Select Dropdown */}
      {response && (
        <div className="w-full max-w-md mt-5">
          <label className="block text-zinc-500 font-bold mb-2">Multi Filter</label>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      )}

      {/* Filtered Response */}
      {response && selectedOptions.length > 0 && (
        <div className="w-full max-w-md mt-5 bg-white p-5 shadow-lg rounded-md">
          <h3 className="text-lg font-bold">Filtered Response</h3>
          {selectedOptions.some(option => option.value === "numbers") && (
            <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
          )}
          {selectedOptions.some(option => option.value === "alphabets") && (
            <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
          )}
          {selectedOptions.some(option => option.value === "highest_alphabet") && (
            <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
          )}
        </div>
      )}

    </div>
  );
}
