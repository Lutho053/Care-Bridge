import {useState,useContext} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {Link} from "react-router-dom";


const DoctorLogin = ({ setDoctorToken }) => {


const {backendUrl}=useContext(AppContext);

const navigate = useNavigate();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");




const loginHandler = async(e)=>{


e.preventDefault();


try{


const {data}=await axios.post(
backendUrl+"/api/doctor/login",
{
email,
password
}
);



if (data.success) {

  localStorage.setItem(
    "doctorToken",
    data.token
  );

  setDoctorToken(data.token);

  toast.success("Login successful");

  navigate("/doctor-dashboard");

}else{

toast.error(data.message);

}



}catch(error){

toast.error(error.message);

}


};





return (

<form 
onSubmit={loginHandler}
className="
min-h-[80vh]
flex
items-center
"
>


<div className="
m-auto
p-8
shadow-lg
border
rounded-xl
flex
flex-col
gap-4
w-[350px]
">


<h1 className="
text-2xl
font-bold
">

Doctor Login

</h1>



<p className="text-gray-500">

Access your dashboard

</p>



<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
border
p-3
rounded
"

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
border
p-3
rounded
"

/>



<button

className="
bg-blue-600
text-white
py-3
rounded
"

>

Login

</button>

<div className="text-right mt-2">

    <Link
        to="/doctor-forgot-password"
        className="text-sm text-blue-600 hover:underline"
    >
        Forgot Password?
    </Link>

</div>

</div>


</form>




)



}


export default DoctorLogin;