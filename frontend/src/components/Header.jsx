import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Header = () => {

  const navigate = useNavigate();


const [searchValue,setSearchValue] = useState("");
const [doctors,setDoctors] = useState([]);



const searchDoctors = async()=>{

  try{

    const {data} = await axios.get(
      `http://localhost:4000/api/doctor/search?speciality=${searchValue}`
    );


    if(data.success){
      setDoctors(data.doctors);
    }


  }catch(error){

    console.log(error);

  }

};



return (

    <section className="px-6 md:px-12 lg:px-20 py-10">

      <div className="
      grid
      md:grid-cols-2
      gap-10
      items-center
      ">


        {/* LEFT CONTENT */}

        <div>


          <div className="
          inline-flex
          items-center
          gap-2
          bg-blue-50
          text-blue-600
          px-4
          py-2
          rounded-full
          text-sm
          mb-6
          ">

            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>

            Trusted Healthcare Platform

          </div>




          <h1 className="
          text-5xl
          lg:text-6xl
          font-bold
          text-gray-900
          leading-tight
          ">

            Healthcare
            <br/>

            made simple
            <br/>

            for everyone.

          </h1>




          <p className="
          mt-6
          text-gray-500
          text-lg
          max-w-lg
          ">

            Connect with qualified doctors,
            book appointments instantly and
            manage your health journey in one place.

          </p>




          {/* SEARCH BOX */}

          <div className="mt-8 bg-white shadow-lg rounded-2xl p-3 flex items-center border max-w-md">

<input
value={searchValue}
onChange={(e)=>setSearchValue(e.target.value)}
placeholder="Search doctor or speciality..."
className="flex-1 outline-none px-4 text-gray-600"
/>


<button
onClick={searchDoctors}
className="bg-blue-600 text-white px-6 py-3 rounded-xl"
>
Search
</button>


</div>

           {/* DOCTORS GRID AFTER SEARCH */}

<div className="grid md:grid-cols-3 gap-6 mt-10">

{
doctors.map((doc)=>(

<div
key={doc._id}
onClick={()=>navigate(`/appointment/${doc._id}`)}
className="
bg-white
rounded-2xl
shadow
p-5
cursor-pointer
hover:shadow-xl
transition
"
>

<img
src={doc.image}
alt={doc.name}
className="w-full h-52 object-cover rounded-xl"
/>


<h2 className="font-bold text-xl mt-4">
{doc.name}
</h2>


<p className="text-blue-600">
{doc.speciality}
</p>


<p className="text-gray-500">
{doc.degree}
</p>


<p className="mt-2">
Fee: R{doc.fees}
</p>


</div>

))
}

</div>





          {/* STATS */}


          <div className="
          flex
          gap-10
          mt-10
          ">


            <div>

              <h2 className="
              text-3xl
              font-bold
              ">
                500+
              </h2>

              <p className="text-gray-500">
                Doctors
              </p>

            </div>




            <div>

              <h2 className="
              text-3xl
              font-bold
              ">
                20k+
              </h2>

              <p className="text-gray-500">
                Patients
              </p>

            </div>




            <div>

              <h2 className="
              text-3xl
              font-bold
              ">
                24/7
              </h2>

              <p className="text-gray-500">
                Support
              </p>

            </div>


          </div>


        </div>







        {/* RIGHT IMAGE */}


        <div className="
        relative
        ">


          <div className="
          rounded-3xl
          overflow-hidden
          shadow-2xl
          ">


            <img
            src={assets.header_img}
            className="
            w-full
            h-[600px]
            object-cover
            "
            />


          </div>





          {/* FLOATING CARD */}


          <div className="
          absolute
          bottom-8
          left-[-30px]
          bg-white
          shadow-xl
          rounded-2xl
          p-5
          hidden
          md:block
          ">


            <p className="
            text-gray-500
            text-sm
            ">
              Next Available
            </p>


            <h3 className="
            font-bold
            text-xl
            ">
              Dr. Sarah Williams
            </h3>


            <p className="
            text-blue-600
            text-sm
            ">
              Cardiologist
            </p>


          </div>



        </div>



      </div>


    </section>

  )
}


export default Header