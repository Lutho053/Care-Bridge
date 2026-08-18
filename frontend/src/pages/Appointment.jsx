import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod,setPaymentMethod] = useState("")

  const { currencySymbol, backendUrl, token } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/doctor/${docId}`);

        if (data.success) {
          setDocInfo(data.doctor);
        } else {
          toast.error(data.message);
        }
      } catch {
        toast.error("Failed to fetch doctor");
      }
    };

    fetchDoctor();
  }, [docId, backendUrl]);

  const getAvailableSlots = () => {
    if (!docInfo) return;

    const today = new Date();
    const slotsBooked = docInfo.slots_booked || {};
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

      while (currentDate < endTime) {
        const time = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        if (!slotsBooked[slotDate] || !slotsBooked[slotDate].includes(time)) {
          daySlots.push({
            datetime: new Date(currentDate),
            time,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const bookAppointment = async () => {

  if (!token) {
    toast.warn("Login to book appointment");
    return navigate("/login");
  }


  if(!paymentMethod){
    toast.error("Select payment method");
    return;
  }


  if (!slotTime) {
    return toast.error("Select a time slot");
  }



  try {


    const date = docSlots[slotIndex][0].datetime;


    const slotDate =
    `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}`;



    const {data} = await axios.post(

      `${backendUrl}/api/user/book-appointment`,

      {
        docId,
        slotDate,
        slotTime,
        paymentMethod
      },

      {
        headers:{
          token
        }
      }

    );



    if(!data.success){

      return toast.error(data.message);

    }



    // ONLINE PAYMENT

    if(paymentMethod === "online"){


      const payRes = await axios.post(

        `${backendUrl}/api/payfast/pay`,

        {
          amount:docInfo.fees,
          item_name:`Appointment with ${docInfo.name}`
        }

      );



      if(!payRes.data.success){

        return toast.error("Payment failed");

      }



      const form =
      document.createElement("form");


      form.method="POST";


      form.action =
      "https://sandbox.payfast.co.za/eng/process";



      Object.entries(payRes.data.paymentData)

      .forEach(([key,value])=>{


        const input =
        document.createElement("input");


        input.type="hidden";

        input.name=key;

        input.value=value;


        form.appendChild(input);


      });



      document.body.appendChild(form);


      form.submit();



    }



    // CASH / MEDICAL AID

    else{


      toast.success(
        "Appointment booked successfully"
      );


      navigate("/my-appointments");


    }



  } catch(error){


    toast.error(
      error.response?.data?.message ||
      error.message
    );


  }


};
 return (
  docInfo && (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 lg:px-20 py-16">

      {/* PROFILE */}
      <section className="bg-white rounded-[40px] shadow-sm p-8 grid md:grid-cols-[320px_1fr] gap-10 items-center">

        <img src={docInfo.image} alt={docInfo.name} className="rounded-3xl w-full h-[380px] object-cover bg-blue-50" />

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{docInfo.name}</h1>
            <img src={assets.verified_icon} className="w-6" />
          </div>

          <p className="mt-3 text-blue-600 font-medium">{docInfo.degree} • {docInfo.speciality}</p>

          <p className="mt-5 text-gray-600 leading-relaxed">{docInfo.about}</p>

          <div className="flex gap-5 mt-8">

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">Experience</p>
              <b>{docInfo.experience}</b>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">Fee</p>
              <b>{currencySymbol}{docInfo.fees}</b>
            </div>

          </div>
        </div>

      </section>


      {/* BOOKING */}
      <section className="bg-white rounded-[40px] shadow-sm mt-12 p-8 md:p-12">

        <h2 className="text-3xl font-bold">Select appointment time</h2>

        <p className="text-gray-500 mt-2">Choose your preferred day and time</p>


        <div className="flex gap-4 overflow-x-auto mt-8">

          {docSlots.map((item,index)=>(
            <div 
              key={index}
              onClick={()=>setSlotIndex(index)}
              className={`min-w-[90px] p-5 text-center rounded-3xl cursor-pointer ${
                slotIndex===index ? "bg-blue-600 text-white" : "bg-gray-50"
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

              <b className="text-2xl">
                {item[0] && item[0].datetime.getDate()}
              </b>

            </div>
          ))}

        </div>


        <div className="flex flex-wrap gap-3 mt-8">

          {docSlots[slotIndex]?.map((item,index)=>(

            <button
              key={index}
              onClick={()=>setSlotTime(item.time)}
              className={`px-5 py-3 rounded-full ${
                slotTime===item.time 
                ? "bg-blue-600 text-white" 
                : "border text-gray-500"
              }`}
            >
              {item.time}
            </button>

          ))}

        </div>

        <div className="mt-8">

<h3 className="font-bold mb-3">
Payment Method
</h3>


<select

className="border p-3 rounded-xl"

value={paymentMethod}

onChange={(e)=>setPaymentMethod(e.target.value)}

>

<option value="">
Select payment
</option>


<option value="online">
Online Payment
</option>


<option value="cash">
Cash
</option>


<option value="medical_aid">
Medical Aid
</option>


</select>


</div>
        <button 
          onClick={bookAppointment}
          className="mt-10 bg-blue-600 text-white px-12 py-4 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Confirm Appointment
        </button>


      </section>


      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>


    </div>
  )
)
};



export default Appointment;