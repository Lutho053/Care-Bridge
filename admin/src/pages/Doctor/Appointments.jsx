import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Appointments = () => {


const [appointments,setAppointments] = useState([]);



const getAppointments = async()=>{


try{


const token = localStorage.getItem("doctorToken");


const {data} = await axios.post(

"http://localhost:4000/api/doctor/dashboard",

{},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



if(data.success){

setAppointments(data.appointments);

}else{

toast.error(data.message);

}


}catch(error){

toast.error(error.message);

}


};




useEffect(()=>{

getAppointments();

},[]);




return (


<div className="p-8 w-full">


<h1 className="text-3xl font-bold mb-8">

Appointments

</h1>



<div className="space-y-5">



{
appointments.map((item,index)=>(


<div

key={index}

className="
bg-white
rounded-2xl
shadow
p-6
border
"


>



<div className="flex justify-between items-center">


<div>


<h2 className="text-xl font-bold">

{item.userData.name}

</h2>


<p className="text-gray-500">

{item.userData.email}

</p>


</div>



<div>


{
item.cancelled ? (

<span className="text-red-500 font-medium">
Cancelled
</span>


)

:

item.isCompleted ? (

<span className="text-green-600 font-medium">
Completed
</span>

)

:

(

<span className="text-blue-600 font-medium">
Pending
</span>

)

}


</div>


</div>




<div className="grid md:grid-cols-4 gap-5 mt-6 text-gray-600">


<div>

<p className="text-sm">
Date
</p>

<b>
{item.slotDate}
</b>

</div>



<div>

<p className="text-sm">
Time
</p>

<b>
{item.slotTime}
</b>

</div>




<div>

<p className="text-sm">
Payment
</p>

<b>

{
item.payment
?
"Paid"
:
"Pending"

}

</b>

</div>



<div>

<p className="text-sm">
Amount
</p>

<b>
R{item.amount}
</b>


</div>



</div>



</div>



))

}



</div>



</div>


)

}


export default Appointments;