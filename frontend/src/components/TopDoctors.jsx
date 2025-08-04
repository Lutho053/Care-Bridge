import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Centered Title */}
      <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
      <p className="text-center sm:w-1/3 text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid for Doctor Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors?.slice(0, 10).map((item, index) => (
          <div 
            key={item._id || index} 
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0)}}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            {item.image && <img className="bg-blue-50 w-full" src={item.image} alt={item.name} />}
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* "More" Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-100 text-gray-600 text-2xl px-3 py-1.5 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
