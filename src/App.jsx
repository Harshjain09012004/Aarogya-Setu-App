import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const mockData = [
  {
    code: "AYU1031",
    term: "Siragranthi",
    discipline: "Ayurveda",
    definition: "Nerve knots or localized swellings affecting nerves.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EF55", display: "Siragranthi (Nerve swelling)" },
      biomed: [
        { code: "8B10", display: "Peripheral neuropathy" },
        { code: "8B11", display: "Nerve tumor" },
      ],
    },
  },
  {
    code: "AYU1032",
    term: "Murchha",
    discipline: "Ayurveda",
    definition: "Fainting or syncope due to imbalance of doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EG12", display: "Murchha (Syncope)" },
      biomed: [
        { code: "RF01", display: "Syncope" },
        { code: "RF02", display: "Vasovagal syncope" },
      ],
    },
  },
  {
    code: "AYU1033",
    term: "Apatarpana Jwara",
    discipline: "Ayurveda",
    definition: "Fever due to depletion or malnutrition.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EH23", display: "Apatarpana Jwara (Malnutrition fever)" },
      biomed: [
        { code: "XA2F", display: "Fever due to malnutrition" },
        { code: "1G41", display: "Infectious fever" },
      ],
    },
  },
  {
    code: "AYU1034",
    term: "Hridroga",
    discipline: "Ayurveda",
    definition: "Heart disorders including palpitation, angina, and ischemia.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EI34", display: "Hridroga (Heart disorder)" },
      biomed: [
        { code: "BA40", display: "Ischemic heart disease" },
        { code: "BA41", display: "Cardiomyopathy" },
      ],
    },
  },
  {
    code: "AYU1035",
    term: "Pittaja Prameha",
    discipline: "Ayurveda",
    definition: "Type of Prameha with predominance of Pitta dosha.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EJ45", display: "Pittaja Prameha (Ayurveda pattern)" },
      biomed: [
        { code: "5A11", display: "Diabetes mellitus Type 2" },
        { code: "5A12", display: "Diabetic nephropathy" },
      ],
    },
  },
  {
    code: "AYU1036",
    term: "Vataj Prameha",
    discipline: "Ayurveda",
    definition: "Type of Prameha dominated by Vata dosha.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EK56", display: "Vataj Prameha (Ayurveda pattern)" },
      biomed: [
        { code: "5A11", display: "Diabetes mellitus" },
        { code: "5A21", display: "Neuropathy" },
      ],
    },
  },
  {
    code: "AYU1037",
    term: "Kaphaja Prameha",
    discipline: "Ayurveda",
    definition: "Prameha with predominance of Kapha dosha.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EL67", display: "Kaphaja Prameha (Ayurveda pattern)" },
      biomed: [
        { code: "5A11", display: "Diabetes mellitus" },
        { code: "5A22", display: "Obesity related metabolic disorder" },
      ],
    },
  },
  {
    code: "AYU1038",
    term: "Shvitra",
    discipline: "Ayurveda",
    definition: "Depigmentation of skin (Vitiligo).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EM78", display: "Shvitra (Skin depigmentation)" },
      biomed: { code: "EA80", display: "Vitiligo" },
    },
  },
  {
    code: "AYU1039",
    term: "Rajayakshma",
    discipline: "Ayurveda",
    definition: "Wasting disease, often correlating with tuberculosis.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EN89", display: "Rajayakshma (Wasting disorder)" },
      biomed: { code: "1B10", display: "Tuberculosis" },
    },
  },
  {
    code: "AYU1040",
    term: "Kasa",
    discipline: "Ayurveda",
    definition: "Cough, acute or chronic respiratory symptom.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EO90", display: "Kasa (Cough)" },
      biomed: [
        { code: "CA21", display: "Acute bronchitis" },
        { code: "CA22", display: "Chronic cough" },
      ],
    },
  },
  {
    code: "AYU1041",
    term: "Pralepana",
    discipline: "Ayurveda",
    definition: "Skin application disorders, topical lesions.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EP01", display: "Pralepana (Topical skin disorders)" },
      biomed: [
        { code: "EA12", display: "Eczema" },
        { code: "EA13", display: "Dermatitis" },
      ],
    },
  },
  {
    code: "AYU1042",
    term: "Tandra",
    discipline: "Ayurveda",
    definition: "Drowsiness or lethargy due to imbalance of doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EQ12", display: "Tandra (Lethargy)" },
      biomed: [
        { code: "RB01", display: "Chronic fatigue syndrome" },
        { code: "RB02", display: "Sleep disorder" },
      ],
    },
  },
  {
    code: "AYU1043",
    term: "Sopha",
    discipline: "Ayurveda",
    definition: "Edema or swelling of body parts.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-ER23", display: "Sopha (Edema)" },
      biomed: [
        { code: "MG20", display: "Generalized edema" },
        { code: "MG21", display: "Inflammatory edema" },
      ],
    },
  },
  {
    code: "AYU1044",
    term: "Ajeerna",
    discipline: "Ayurveda",
    definition: "Indigestion or impaired digestion.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-ES34", display: "Ajeerna (Indigestion)" },
      biomed: [
        { code: "DA43.0", display: "Dyspepsia" },
        { code: "DA44.0", display: "Gastroenteritis" },
      ],
    },
  },
  {
    code: "AYU1045",
    term: "Arsha",
    discipline: "Ayurveda",
    definition: "Hemorrhoids or piles.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-ET45", display: "Arsha (Hemorrhoids)" },
      biomed: { code: "ME22.1", display: "Hemorrhoids" },
    },
  },
  {
    code: "AYU1046",
    term: "Sannipata Jwara",
    discipline: "Ayurveda",
    definition: "Complex fever involving all three doshas (Vata, Pitta, Kapha).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EU56", display: "Sannipata Jwara (Complex fever)" },
      biomed: [
        { code: "1G40", display: "Malaria" },
        { code: "XA2E", display: "Viral fever" },
      ],
    },
  },
  {
    code: "AYU1047",
    term: "Sandhivata",
    discipline: "Ayurveda",
    definition: "Osteoarthritis or joint stiffness due to Vata imbalance.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EV67", display: "Sandhivata (Joint disorder)" },
      biomed: [
        { code: "FA30", display: "Osteoarthritis" },
        { code: "FA31", display: "Rheumatoid arthritis" },
      ],
    },
  },
  {
    code: "AYU1048",
    term: "Shleepada",
    discipline: "Ayurveda",
    definition: "Chronic swelling of limbs, often linked to filariasis (elephantiasis).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EW78", display: "Shleepada (Lymphedema)" },
      biomed: { code: "1F54", display: "Lymphatic filariasis" },
    },
  },
  {
    code: "AYU1049",
    term: "Unmada",
    discipline: "Ayurveda",
    definition: "Mental disorders including psychosis or mania.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EX89", display: "Unmada (Mental disorder)" },
      biomed: [
        { code: "6A20", display: "Schizophrenia" },
        { code: "6A40", display: "Bipolar disorder" },
      ],
    },
  },
  {
    code: "AYU1050",
    term: "Apasmara",
    discipline: "Ayurveda",
    definition: "Neurological disorder with recurrent seizures, linked to epilepsy.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EY90", display: "Apasmara (Seizure disorder)" },
      biomed: { code: "8A60", display: "Epilepsy" },
    },
  },
  {
    code: "AYU1016",
    term: "Raktapitta",
    discipline: "Ayurveda",
    definition: "Bleeding disorders caused by vitiation of blood and Pitta dosha.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DQ11", display: "Raktapitta (Bleeding disorder)" },
      biomed: [
        { code: "3A10", display: "Hemophilia" },
        { code: "3A20", display: "Epistaxis" },
      ],
    },
  },
  {
    code: "AYU1017",
    term: "Hikka",
    discipline: "Ayurveda",
    definition: "Involuntary spasmodic contraction of diaphragm (hiccups).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DR22", display: "Hikka (Diaphragm disorder)" },
      biomed: { code: "RA01", display: "Hiccups (singultus)" },
    },
  },
  {
    code: "AYU1018",
    term: "Mutrakrichra",
    discipline: "Ayurveda",
    definition: "Difficulty in urination, sometimes linked to kidney or bladder issues.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DS31", display: "Mutrakrichra (Urinary disorder)" },
      biomed: [
        { code: "GB10", display: "Urinary tract infection" },
        { code: "GB20", display: "Kidney stones" },
      ],
    },
  },
  {
    code: "AYU1019",
    term: "Trishna",
    discipline: "Ayurveda",
    definition: "Excessive thirst, often associated with dehydration or diabetes.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DT41", display: "Trishna (Thirst disorder)" },
      biomed: [
        { code: "5A11", display: "Diabetes mellitus" },
        { code: "DA90", display: "Dehydration" },
      ],
    },
  },
  {
    code: "AYU1020",
    term: "Daurbalya",
    discipline: "Ayurveda",
    definition: "General weakness or debility due to imbalance of doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DU52", display: "Daurbalya (Weakness)" },
      biomed: { code: "RA90", display: "Generalized weakness" },
    },
  },
  {
    code: "AYU1021",
    term: "Angamarda",
    discipline: "Ayurveda",
    definition: "Body aches and pains, often related to fever or Vata imbalance.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DV63", display: "Angamarda (Body ache)" },
      biomed: [
        { code: "MG25", display: "Myalgia" },
        { code: "1A00", display: "Viral fever" },
      ],
    },
  },
  {
    code: "AYU1022",
    term: "Shotha",
    discipline: "Ayurveda",
    definition: "Swelling or edema due to dosha imbalance.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DW14", display: "Shotha (Edema)" },
      biomed: [
        { code: "MG20", display: "Generalized edema" },
        { code: "MG21", display: "Inflammatory swelling" },
      ],
    },
  },
  {
    code: "AYU1023",
    term: "Pinasa",
    discipline: "Ayurveda",
    definition: "Chronic rhinitis or sinus congestion, often due to Kapha imbalance.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DX25", display: "Pinasa (Chronic rhinitis)" },
      biomed: [
        { code: "RA01", display: "Allergic rhinitis" },
        { code: "RA02", display: "Chronic sinusitis" },
      ],
    },
  },
  {
    code: "AYU1024",
    term: "Ardita",
    discipline: "Ayurveda",
    definition: "Facial paralysis, often associated with Vata disorders (Bell's palsy).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DY36", display: "Ardita (Facial paralysis)" },
      biomed: { code: "6A60", display: "Bell's palsy" },
    },
  },
  {
    code: "AYU1025",
    term: "Vishama Jwara",
    discipline: "Ayurveda",
    definition: "Irregular fever, characterized by fluctuation in intensity and duration.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DZ47", display: "Vishama Jwara (Irregular fever)" },
      biomed: [
        { code: "1G40", display: "Malaria" },
        { code: "XA2E", display: "Viral fever" },
      ],
    },
  },
  {
    code: "AYU1026",
    term: "Hridroga",
    discipline: "Ayurveda",
    definition: "Heart disorders, including palpitations, chest pain, and ischemia.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EA11", display: "Hridroga (Heart disorder)" },
      biomed: [
        { code: "BA40", display: "Ischemic heart disease" },
        { code: "BA41", display: "Cardiomyopathy" },
      ],
    },
  },
  {
    code: "AYU1027",
    term: "Murchha",
    discipline: "Ayurveda",
    definition: "Fainting or syncope caused by vitiated doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EB12", display: "Murchha (Syncope)" },
      biomed: [
        { code: "RF01", display: "Syncope" },
        { code: "RF02", display: "Vasovagal syncope" },
      ],
    },
  },
  {
    code: "AYU1028",
    term: "Vatarakta",
    discipline: "Ayurveda",
    definition: "Joint disorder caused by vitiated Vata and Rakta doshas (like gout).",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EC22", display: "Vatarakta (Joint disorder)" },
      biomed: { code: "FA25.0", display: "Gout" },
    },
  },
  {
    code: "AYU1029",
    term: "Udara Roga",
    discipline: "Ayurveda",
    definition: "Abdominal disorders, including bloating and ascites.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-ED33", display: "Udara Roga (Abdominal disorder)" },
      biomed: [
        { code: "DB70", display: "Ascites" },
        { code: "DB71", display: "Hepatomegaly" },
      ],
    },
  },
  {
    code: "AYU1030",
    term: "Krimi Roga",
    discipline: "Ayurveda",
    definition: "Parasitic infestation, commonly intestinal worms.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-EE44", display: "Krimi Roga (Parasitic disease)" },
      biomed: [
        { code: "1F20", display: "Intestinal helminthiasis" },
        { code: "1F21", display: "Amoebiasis" },
      ],
    },
  },
  {
    code: "AYU1001",
    term: "Amlapitta",
    discipline: "Ayurveda",
    definition: "A condition characterized by excess acidic secretion in the stomach.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DA63", display: "Amlapitta (Ayurveda Pattern)" },
      biomed: { code: "MB23.1", display: "Gastritis" },
    },
  },
  {
    code: "AYU1002",
    term: "Prameha",
    discipline: "Ayurveda",
    definition: "A group of metabolic disorders, often linked with diabetes mellitus.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DB12", display: "Prameha (Ayurveda Pattern)" },
      biomed: { code: "5A11", display: "Diabetes mellitus" },
    },
  },
  {
    code: "AYU1003",
    term: "Jwara",
    discipline: "Ayurveda",
    definition: "Fever; one of the earliest described diseases in Ayurveda.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DC01", display: "Jwara (Fever)" },
      biomed: [
        { code: "XA2E", display: "Viral fever" },
        { code: "XA3P", display: "Bacterial fever" },
        { code: "1G40", display: "Malaria" },
      ],
    },
  },
  {
    code: "AYU1004",
    term: "Arsha",
    discipline: "Ayurveda",
    definition: "Hemorrhoids or piles caused by imbalance of Doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DD22", display: "Arsha (Hemorrhoids)" },
      biomed: { code: "ME22.1", display: "Hemorrhoids" },
    },
  },
  {
    code: "AYU1005",
    term: "Kustha",
    discipline: "Ayurveda",
    definition: "Skin disorders grouped under one category, including psoriasis and leprosy.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DE14", display: "Kustha (Skin Disorder)" },
      biomed: [
        { code: "EA80", display: "Psoriasis" },
        { code: "1F20", display: "Leprosy" },
        { code: "EA12", display: "Eczema" },
      ],
    },
  },
  {
    code: "AYU1006",
    term: "Yakrit Roga",
    discipline: "Ayurveda",
    definition: "Liver disorders due to excess Pitta and toxins.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DF45", display: "Yakrit Roga (Liver disorder)" },
      biomed: [
        { code: "DB91", display: "Fatty liver" },
        { code: "DB92", display: "Hepatitis" },
      ],
    },
  },
  {
    code: "AYU1007",
    term: "Shwasa",
    discipline: "Ayurveda",
    definition: "Respiratory disorders including asthma and breathlessness.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DG11", display: "Shwasa (Respiratory disorder)" },
      biomed: { code: "CA23", display: "Asthma" },
    },
  },
  {
    code: "AYU1008",
    term: "Atisara",
    discipline: "Ayurveda",
    definition: "Diarrheal condition caused by vitiation of Doshas.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DH31", display: "Atisara (Diarrhea)" },
      biomed: { code: "DA43.0", display: "Acute diarrhea" },
    },
  },
  {
    code: "AYU1009",
    term: "Mootrakrichra",
    discipline: "Ayurveda",
    definition: "Painful or difficult urination, often linked with UTI or stones.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DI42", display: "Mootrakrichra (Urinary disorder)" },
      biomed: [
        { code: "GB10", display: "Urinary tract infection" },
        { code: "GB20", display: "Kidney stones" },
      ],
    },
  },
  {
    code: "AYU1010",
    term: "Vatarakta",
    discipline: "Ayurveda",
    definition: "Joint disorder caused by vitiation of Vata and Rakta; often linked to gout.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DJ77", display: "Vatarakta (Joint disorder)" },
      biomed: { code: "FA25.0", display: "Gout" },
    },
  },
  {
    code: "AYU1011",
    term: "Pandu",
    discipline: "Ayurveda",
    definition: "A condition resembling anemia, with paleness and weakness.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DK08", display: "Pandu (Anemia-like disorder)" },
      biomed: { code: "BA00", display: "Iron deficiency anemia" },
    },
  },
  {
    code: "AYU1012",
    term: "Unmada",
    discipline: "Ayurveda",
    definition: "Mental disorder caused by imbalance of Doshas, linked with psychosis.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DL32", display: "Unmada (Mental disorder)" },
      biomed: [
        { code: "6A20", display: "Schizophrenia" },
        { code: "6A40", display: "Bipolar disorder" },
      ],
    },
  },
  {
    code: "AYU1013",
    term: "Apasmara",
    discipline: "Ayurveda",
    definition: "Neurological disorder with recurrent seizures, linked to epilepsy.",
    version: "NAMASTE-v2025.01",
    mappings: {
      tm2: { code: "TM2-DM15", display: "Apasmara (Seizure disorder)" },
      biomed: { code: "8A60", display: "Epilepsy" },
    },
  }
];

export default function AyushMappingApp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const random = [...mockData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
    setSuggested(random);
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = mockData.filter((item) =>
      item.term.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 relative">
        {selected && 
          <button
            onClick={() => setSelected(null)}
            className="mb-3 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 absolute"
          >
            ← Back
          </button>
        }

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
            <ul className="absolute w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-10 max-h-64 overflow-y-auto">
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

        {/* Show Selected Disease */}
        {selected ? (
          <div className="bg-gray-50 border rounded-xl p-4 space-y-3">
            <h2 className="text-xl font-semibold">{selected.term}</h2>
            <p className="text-gray-600">{selected.definition}</p>
            <p className="text-sm text-gray-500">
              Discipline: {selected.discipline} | Version: {selected.version}
            </p>

            <div className="mt-4 space-y-2">
              {/* TM2 Mapping */}
              <div className="p-3 border rounded-lg bg-white">
                <h3 className="font-medium">ICD-11 TM2 Mapping</h3>
                <p>
                  Code:{" "}
                  <span className="font-mono">{selected.mappings.tm2.code}</span> —{" "}
                  {selected.mappings.tm2.display}
                </p>
              </div>

              {/* Biomed Mapping */}
              <div className="p-3 border rounded-lg bg-white">
                <h3 className="font-medium">ICD-11 Biomedicine Mapping</h3>
                {Array.isArray(selected.mappings.biomed) ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Multiple matches found. Please choose:
                    </p>
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
                    Code:{" "}
                    <span className="font-mono">{selected.mappings.biomed.code}</span> —{" "}
                    {selected.mappings.biomed.display}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Default Suggested Diseases */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggested.map((item) => (
              <div
                key={item.code}
                className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <h3 className="font-medium">{item.term}</h3>
                <p className="text-sm text-gray-500 truncate">{item.definition}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}