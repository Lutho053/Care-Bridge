
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FindDoctor = () => {
  const { doctors } = useContext(AppContext);

  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Problem categories
  const problemCategories = [
    {
      label: "Tooth or dental problem",
      value: "tooth",
      icon: "🦷",
    },
    {
      label: "Skin problem",
      value: "skin",
      icon: "🧴",
    },
    {
      label: "Heart or chest problem",
      value: "heart",
      icon: "❤️",
    },
    {
      label: "Eye or vision problem",
      value: "eye",
      icon: "👁️",
    },
    {
      label: "Mental health",
      value: "mental health",
      icon: "🧠",
    },
    {
      label: "Fever, flu or general illness",
      value: "fever",
      icon: "🤒",
    },
    {
      label: "Child healthcare",
      value: "child",
      icon: "👶",
    },
    {
      label: "Bones or joint problem",
      value: "bone",
      icon: "🦴",
    },
    {
      label: "Women's health",
      value: "pregnancy",
      icon: "🤰",
    },
    {
      label: "Headaches or dizziness",
      value: "headache",
      icon: "🤕",
    },
  ];

  // Problem -> speciality matching
  const specialityKeywords = {
    dentist: [
      "tooth",
      "teeth",
      "toothache",
      "dental",
      "dentist",
      "gum",
      "cavity",
    ],

    dermatologist: [
      "skin",
      "rash",
      "acne",
      "eczema",
      "itching",
      "pimples",
    ],

    cardiologist: [
      "heart",
      "chest pain",
      "blood pressure",
      "cardiac",
    ],

    ophthalmologist: [
      "eye",
      "eyes",
      "vision",
      "blurry vision",
      "sight",
    ],

    gynecologist: [
      "pregnancy",
      "pregnant",
      "period",
      "menstrual",
      "women's health",
    ],

    pediatricians: [
      "child",
      "children",
      "baby",
      "infant",
      "kid",
    ],

    orthopaedic: [
      "bone",
      "bones",
      "fracture",
      "joint",
      "knee",
      "shoulder",
      "back pain",
    ],

    ent: [
      "ear",
      "hearing",
      "nose",
      "throat",
      "sinus",
    ],

    psychiatrist: [
      "mental health",
      "depression",
      "anxiety",
      "stress",
      "panic",
    ],

    neurologist: [
      "headache",
      "headaches",
      "migraine",
      "dizziness",
      "seizure",
      "nerve",
      "nervous system",
    ],

    gastroenterologist: [
      "stomach",
      "abdominal",
      "abdomen",
      "digestion",
      "digestive",
      "diarrhea",
      "constipation",
      "vomiting",
      "nausea",
    ],

    "general physician": [
      "fever",
      "flu",
      "cough",
      "cold",
      "sick",
      "tired",
      "fatigue",
    ],
  };

  // Get user's location
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location services are not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Location request failed");
          }

          const data = await response.json();

          const city =
  data.address?.city ||
  data.address?.town ||
  data.address?.village ||
  data.address?.city_district ||
  "";

          if (city) {
            setLocation(city);

            toast.success(`Location detected: ${city}`);
          } else {
            toast.error("Could not determine your city");
          }
        } catch (error) {
          console.error("Location error:", error);
          toast.error("Error fetching location data");
        } finally {
          setLoadingLocation(false);
        }
      },

      (error) => {
        console.error("Geolocation error:", error);

        setLoadingLocation(false);

        if (error.code === 1) {
          toast.error("Please allow location access");
        } else if (error.code === 2) {
          toast.error("Your location could not be determined");
        } else {
          toast.error("Unable to get your location");
        }
      }
    );
  };

  // Find matching doctors
  const findDoctor = () => {
    if (!location.trim() && !problem.trim()) {
      toast.error("Please enter your location or medical problem");
      return;
    }

    const searchLocation = location.toLowerCase().trim();
    const searchProblem = problem.toLowerCase().trim();

    const matchedSpecialities = [];

    Object.entries(specialityKeywords).forEach(
      ([speciality, keywords]) => {
        const matched = keywords.some((keyword) =>
          searchProblem.includes(keyword)
        );

        if (matched) {
          matchedSpecialities.push(speciality);
        }
      }
    );

    const results = doctors.filter((doctor) => {
      const doctorSpeciality =
        doctor.speciality?.toLowerCase() || "";

      const doctorAbout =
        doctor.about?.toLowerCase() || "";

      const doctorAddress = `
        ${doctor.address?.line1 || ""}
        ${doctor.address?.line2 || ""}
      `.toLowerCase();

      // Location
      const matchesLocation =
        !searchLocation ||
        doctorAddress.includes(searchLocation);

      // Problem
      let matchesProblem = true;

      if (searchProblem) {
        if (matchedSpecialities.length > 0) {
          matchesProblem = matchedSpecialities.some(
            (speciality) =>
              doctorSpeciality.includes(speciality)
          );
        } else {
          matchesProblem =
            doctorSpeciality.includes(searchProblem) ||
            doctorAbout.includes(searchProblem);
        }
      }

      return matchesLocation && matchesProblem;
    });

    setFilteredDoctors(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-20">

      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center">

        <p className="text-blue-600 font-semibold mb-3">
          FIND THE RIGHT DOCTOR
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Find the right doctor
          <br />
          for your needs
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          Tell us what you need help with and where you are located.
          We&apos;ll help you find suitable healthcare professionals.
        </p>

      </div>

      {/* PROBLEM CATEGORIES */}
      <div className="max-w-5xl mx-auto mt-12">

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What do you need help with?
        </h2>

        <p className="text-gray-500 mb-6">
          Choose a problem or describe what you&apos;re experiencing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {problemCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setProblem(category.value)}
              className={`bg-white border rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition ${
                problem === category.value
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-gray-200"
              }`}
            >

              <div className="text-3xl mb-3">
                {category.icon}
              </div>

              <p className="font-semibold text-gray-800 text-sm">
                {category.label}
              </p>

            </button>
          ))}

        </div>

      </div>

      {/* SEARCH BOX */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        <div className="grid md:grid-cols-2 gap-6">

          {/* LOCATION */}
          <div>

            <label className="block font-semibold mb-2">
              Where are you located?
            </label>

            <div className="flex flex-col sm:flex-row gap-2">

              <input
                type="text"
                placeholder="e.g. Kimberley"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={useMyLocation}
                disabled={loadingLocation}
                className="px-5 py-4 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition whitespace-nowrap disabled:opacity-50"
              >
                {loadingLocation
                  ? "Finding location..."
                  : "📍 Use my location"}
              </button>

            </div>

          </div>

          {/* PROBLEM */}
          <div>

            <label className="block font-semibold mb-2">
              Describe your problem
            </label>

            <input
              type="text"
              placeholder="e.g. I need to remove a tooth"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* SEARCH BUTTON */}
        <button
          type="button"
          onClick={findDoctor}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Find My Doctor
        </button>

      </div>

      {/* RESULTS */}
      {hasSearched && (
        <div className="max-w-6xl mx-auto mt-14">

          <h2 className="text-2xl font-bold mb-6">

            {filteredDoctors.length > 0
              ? `${filteredDoctors.length} doctor(s) found`
              : "No matching doctors found"}

          </h2>

          {filteredDoctors.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredDoctors.map((doctor) => (

                <div
                  key={doctor._id}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition"
                >

                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-xl font-bold">
                      {doctor.name}
                    </h3>

                    <p className="text-blue-600 font-medium mt-1">
                      {doctor.speciality}
                    </p>

                    <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                      {doctor.about}
                    </p>

                    <p className="text-gray-500 text-sm mt-4">
                      📍 {doctor.address?.line1}
                    </p>

                    <Link
                      to={`/appointment/${doctor._id}`}
                      className="block text-center mt-5 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      View Doctor
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="bg-white rounded-2xl p-8 text-center">

              <p className="text-gray-600">
                We couldn&apos;t find a matching doctor yet.
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Try searching using a different medical
                problem or location.
              </p>

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default FindDoctor;
