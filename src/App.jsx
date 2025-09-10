import { useState } from "react";
import { Search } from "lucide-react";

// Mock data (replace with your API later)
const mockData = [
  {
    code: "AYU1234",
    term: "Amlapitta",
    discipline: "Ayurveda",
    definition: "A condition of excess acidic secretion in the stomach.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DA63", display: "Amlapitta (TM2 pattern)" },
      biomed: [
        { code: "MB23.1", display: "Gastritis" },
        { code: "MB23.2", display: "Acid reflux" },
      ],
    },
  },
  {
    code: "AYU5678",
    term: "Prameha",
    discipline: "Ayurveda",
    definition: "A metabolic disorder, often correlated with diabetes mellitus.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DB12", display: "Prameha (TM2 pattern)" },
      biomed: [{ code: "5A11", display: "Diabetes mellitus" }],
    },
  },
  {
    code: "AYU5161",
    term: "Jwara",
    discipline: "Ayurveda",
    definition: "A fever condition with dosha-specific classifications in Ayurveda.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-RC10", display: "Jwara (TM2 pattern)" },
      biomed: [
        { code: "1D00", display: "Fever, unspecified" },
        { code: "1D10", display: "Viral fever" },
        { code: "1D20", display: "Malarial fever" },
      ],
    },
  },
  {
    code: "AYU9205",
    term: "Shiro Roga",
    discipline: "Ayurveda",
    definition: "A category of head disorders, often compared to migraines and headaches.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-HN01", display: "Shiro Roga (TM2 pattern)" },
      biomed: [
        { code: "8A00", display: "Migraine" },
        { code: "8A10", display: "Tension-type headache" },
      ],
    },
  },
  {
    code: "AYU10206",
    term: "Sandhivata",
    discipline: "Ayurveda",
    definition: "Degenerative joint disorder, often compared to osteoarthritis.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-MS20", display: "Sandhivata (TM2 pattern)" },
      biomed: [{ code: "FA00", display: "Osteoarthritis" }],
    },
  },
  {
    code: "AYU13209",
    term: "Kamala",
    discipline: "Ayurveda",
    definition: "A disorder marked by yellowing of skin and eyes, comparable to jaundice.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-LV10", display: "Kamala (TM2 pattern)" },
      biomed: [
        { code: "DB90", display: "Hepatitis" },
        { code: "DB91", display: "Obstructive jaundice" },
      ],
    },
  },
  {
    code: "AYU14210",
    term: "Hridaya Roga",
    discipline: "Ayurveda",
    definition: "Heart disorders described in Ayurveda, comparable to ischemic heart disease.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-CV20", display: "Hridaya Roga (TM2 pattern)" },
      biomed: [
        { code: "BA40", display: "Ischemic heart disease" },
        { code: "BA41", display: "Angina pectoris" },
        { code: "BA42", display: "Myocardial infarction" },
      ],
    },
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = mockData.filter((d) =>
        d.term.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          AYUSH → ICD-11
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search AYUSH disease (e.g., Amlapitta)"
            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />

          {/* Autocomplete Suggestions */}
          {results.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-10">
              {results.map((item) => (
                <li
                  key={item.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelected(item);
                    setQuery(item.term);
                    setResults([]);
                  }}
                >
                  {item.term} <span className="text-sm text-gray-500">({item.discipline})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Disease Details */}
        {selected && (
          <div className="bg-gray-50 border rounded-xl p-4 space-y-3">
            <h2 className="text-xl font-semibold">{selected.term}</h2>
            <p className="text-gray-600">{selected.definition}</p>
            <p className="text-sm text-gray-500">
              Discipline: {selected.discipline} | Version: {selected.version}
            </p>

            <div className="mt-4 space-y-2">
              <div className="p-3 border rounded-lg bg-white">
                <h3 className="font-medium">ICD-11 TM2 Mapping</h3>
                <p>
                  Code: <span className="font-mono">{selected.mappings.tm2.code}</span> —{" "}
                  {selected.mappings.tm2.display}
                </p>
              </div>

             <div className="p-3 border rounded-lg bg-white">
              <h3 className="font-medium">ICD-11 Biomedicine Mapping</h3>

              {Array.isArray(selected.mappings.biomed)? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Multiple matches found. Please choose:</p>
                  {selected.mappings.biomed.map((b) => (
                    <label key={b.code} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`biomed-${selected.code}`}
                        value={b.code}
                      />
                      <span>
                        <span className="font-mono">{b.code}</span> — {b.display}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p>
                  Code: <span className="font-mono">{selected.mappings.biomed.code}</span> —{" "}
                  {selected.mappings.biomed.display}
                </p>
              )}
            </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
