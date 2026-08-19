import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {

  const { backendUrl } = useContext(AppContext);

const [doctor, setDoctor] = useState(null);

const [about, setAbout] = useState("");
const [fees, setFees] = useState("");
const [available, setAvailable] = useState(false);
const [image, setImage] = useState(null);

// Password states
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [changingPassword, setChangingPassword] = useState(false);

// =========================
// GET PROFILE
// =========================

const getProfile = async () => {


try {

  const token = localStorage.getItem("doctorToken");

  const { data } = await axios.post(
    `${backendUrl}/api/doctor/dashboard`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (data.success) {

    setAbout(data.doctor.about);
    setFees(data.doctor.fees);
    setAvailable(data.doctor.available);

    setDoctor(data.doctor);

  } else {

    toast.error(data.message);

  }

} catch (error) {

  toast.error(error.message);

}


};

// =========================
// SAVE PROFILE
// =========================

const saveProfile = async () => {


try {

  const token = localStorage.getItem("doctorToken");

  const { data } = await axios.post(

    "http://localhost:4000/api/doctor/update-profile",

    {
      about,
      fees,
      available
    },

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  );


  if (data.success) {

    toast.success(data.message);

    getProfile();

  } else {

    toast.error(data.message);

  }


} catch (error) {

  toast.error(error.message);

}


};

// =========================
// UPLOAD IMAGE
// =========================

const uploadImage = async () => {


try {

  if (!image) {

    toast.error("Please select an image");

    return;

  }

  const token = localStorage.getItem("doctorToken");

  const formData = new FormData();

  formData.append("image", image);


  const { data } = await axios.post(

    "http://localhost:4000/api/doctor/update-image",

    formData,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  );


  if (data.success) {

    toast.success("Profile image updated");

    setImage(null);

    getProfile();

  } else {

    toast.error(data.message);

  }


} catch (error) {

  toast.error(error.message);

}


};

// =========================
// CHANGE PASSWORD
// =========================

const changePassword = async () => {


if (!currentPassword || !newPassword || !confirmPassword) {

  toast.error("Please fill in all password fields");

  return;

}


if (newPassword.length < 8) {

  toast.error("New password must be at least 8 characters");

  return;

}


if (newPassword !== confirmPassword) {

  toast.error("New passwords do not match");

  return;

}


try {

  setChangingPassword(true);

  const token = localStorage.getItem("doctorToken");


  const { data } = await axios.post(

    "http://localhost:4000/api/doctor/change-password",

    {
      currentPassword,
      newPassword,
      confirmPassword
    },

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  );


  if (data.success) {

    toast.success("Password changed successfully");

    // Clear password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } else {

    toast.error(data.message);

  }


} catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Unable to change password"
  );

} finally {

  setChangingPassword(false);

}


};

useEffect(() => {


getProfile();


}, []);

if (!doctor) {


return (

  <div className="p-10 text-center text-gray-500">

    Loading profile...

  </div>

);


}

return (


<div className="min-h-screen bg-gray-50 p-5 md:p-8">

  <div className="max-w-5xl mx-auto">


    {/* PAGE HEADER */}

    <div className="mb-8">

      <h1 className="text-3xl font-bold text-gray-900">

        Doctor Profile

      </h1>

      <p className="text-gray-500 mt-2">

        Manage your professional information and account settings.

      </p>

    </div>



    {/* ========================= */}
    {/* PROFILE INFORMATION */}
    {/* ========================= */}

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">


      {/* PROFILE HEADER */}

      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8">

        <div className="flex flex-col md:flex-row items-center gap-6">


          {/* IMAGE */}

          <div className="text-center">

            <label htmlFor="doctorImage" className="cursor-pointer">

              <img

                src={
                  image
                    ? URL.createObjectURL(image)
                    : doctor.image
                }

                alt={doctor.name}

                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-lg
                "

              />

            </label>


            <input

              type="file"

              id="doctorImage"

              hidden

              accept="image/*"

              onChange={(e) =>
                setImage(e.target.files[0])
              }

            />


            {image && (

              <button

                onClick={uploadImage}

                className="
                  mt-3
                  bg-white
                  text-blue-600
                  px-5
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  hover:bg-gray-100
                "

              >

                Upload Image

              </button>

            )}

          </div>


          {/* DOCTOR NAME */}

          <div className="text-center md:text-left text-white">

            <h2 className="text-2xl font-bold">

              Dr. {doctor.name.replace(/^Dr\.\s*/i, "")}

            </h2>

            <p className="mt-1 text-blue-100">

              {doctor.speciality}

            </p>

            <p className="text-sm text-blue-100 mt-1">

              {doctor.degree}

            </p>

          </div>


        </div>

      </div>



      {/* PROFILE BODY */}

      <div className="p-6 md:p-8">


        <h3 className="text-xl font-semibold text-gray-900 mb-6">

          Professional Information

        </h3>


        <div className="grid md:grid-cols-2 gap-6">


          {/* NAME */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Name

            </label>

            <input

              value={doctor.name}

              readOnly

              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                p-3
                rounded-lg
                mt-2
                text-gray-600
              "

            />

          </div>


          {/* EMAIL */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Email

            </label>

            <input

              value={doctor.email}

              readOnly

              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                p-3
                rounded-lg
                mt-2
                text-gray-600
              "

            />

          </div>


          {/* SPECIALITY */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Speciality

            </label>

            <input

              value={doctor.speciality}

              readOnly

              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                p-3
                rounded-lg
                mt-2
                text-gray-600
              "

            />

          </div>


          {/* DEGREE */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Degree

            </label>

            <input

              value={doctor.degree}

              readOnly

              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                p-3
                rounded-lg
                mt-2
                text-gray-600
              "

            />

          </div>


          {/* EXPERIENCE */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Experience

            </label>

            <input

              value={doctor.experience}

              readOnly

              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                p-3
                rounded-lg
                mt-2
                text-gray-600
              "

            />

          </div>


          {/* FEES */}

          <div>

            <label className="text-sm font-medium text-gray-700">

              Consultation Fee

            </label>

            <input

              value={fees}

              onChange={(e) =>
                setFees(e.target.value)
              }

              className="
                w-full
                border
                border-gray-200
                p-3
                rounded-lg
                mt-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

          </div>

        </div>



        {/* ABOUT */}

        <div className="mt-6">

          <label className="text-sm font-medium text-gray-700">

            About

          </label>

          <textarea

            rows="5"

            value={about}

            onChange={(e) =>
              setAbout(e.target.value)
            }

            className="
              w-full
              border
              border-gray-200
              p-3
              rounded-lg
              mt-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "

          />

        </div>



        {/* AVAILABILITY */}

        <div className="mt-6">

          <p className="text-sm font-medium text-gray-700">

            Availability

          </p>


          <label className="flex items-center gap-3 mt-3 cursor-pointer">

            <input

              type="checkbox"

              checked={available}

              onChange={() =>
                setAvailable(!available)
              }

              className="w-5 h-5"

            />

            <span className="text-gray-700">

              {available
                ? "Available for appointments"
                : "Currently unavailable"
              }

            </span>

          </label>

        </div>



        {/* SAVE */}

        <button

          onClick={saveProfile}

          className="
            mt-8
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            font-medium
            transition
          "

        >

          Save Changes

        </button>

      </div>

    </div>



    {/* ========================= */}
    {/* SECURITY */}
    {/* ========================= */}

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-gray-100
      mt-8
      p-6
      md:p-8
    ">


      <div className="mb-6">

        <h3 className="text-xl font-semibold text-gray-900">

          Security

        </h3>

        <p className="text-gray-500 text-sm mt-1">

          Change your password to keep your account secure.

        </p>

      </div>



      <div className="max-w-2xl space-y-5">


        {/* CURRENT PASSWORD */}

        <div>

          <label className="text-sm font-medium text-gray-700">

            Current Password

          </label>

          <div className="relative mt-2">

            <input

              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }

              value={currentPassword}

              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }

              placeholder="Enter your current password"

              className="
                w-full
                border
                border-gray-200
                p-3
                pr-20
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

            <button

              type="button"

              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }

              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-sm
                text-blue-600
              "

            >

              {showCurrentPassword ? "Hide" : "Show"}

            </button>

          </div>

        </div>



        {/* NEW PASSWORD */}

        <div>

          <label className="text-sm font-medium text-gray-700">

            New Password

          </label>

          <div className="relative mt-2">

            <input

              type={
                showNewPassword
                  ? "text"
                  : "password"
              }

              value={newPassword}

              onChange={(e) =>
                setNewPassword(e.target.value)
              }

              placeholder="Enter your new password"

              className="
                w-full
                border
                border-gray-200
                p-3
                pr-20
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

            <button

              type="button"

              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }

              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-sm
                text-blue-600
              "

            >

              {showNewPassword ? "Hide" : "Show"}

            </button>

          </div>

          <p className="text-xs text-gray-500 mt-2">

            Password must contain at least 8 characters.

          </p>

        </div>



        {/* CONFIRM PASSWORD */}

        <div>

          <label className="text-sm font-medium text-gray-700">

            Confirm New Password

          </label>

          <div className="relative mt-2">

            <input

              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }

              value={confirmPassword}

              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }

              placeholder="Confirm your new password"

              className="
                w-full
                border
                border-gray-200
                p-3
                pr-20
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

            <button

              type="button"

              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }

              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-sm
                text-blue-600
              "

            >

              {showConfirmPassword ? "Hide" : "Show"}

            </button>

          </div>

        </div>



        {/* CHANGE PASSWORD */}

        <button

          onClick={changePassword}

          disabled={changingPassword}

          className="
            bg-gray-900
            hover:bg-black
            disabled:bg-gray-400
            text-white
            px-7
            py-3
            rounded-xl
            font-medium
            transition
          "

        >

          {changingPassword
            ? "Changing Password..."
            : "Change Password"
          }

        </button>


      </div>


    </div>


  </div>

</div>


);

};

export default DoctorProfile;
