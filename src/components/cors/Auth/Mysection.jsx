import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonalDetailItem from '../../common/PersonalDetailItem';

const Mysection = () => {

  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log("User for my section = ", user);

  return (
    <div className="h-screen mt-[250px] w-full flex flex-col justify-center items-center rounded-lg shadow-md p-4 space-y-6">

      <div>
        <h1 className='text-4xl text-yellow-50 font-semibold'>My Profile</h1>
      </div>
      {/* Section 1: Profile Information */}
      <div className="flex items-center space-x-4 h-[300px] border-b-2 border-b-yellow-25 pb-6">
        <img src={user?.image} alt="Profile" className="w-[200px] h-[200px] rounded-full object-cover" />
        <div>
          <p className="text-xl font-semibold">{user?.firstName}</p>
          <p className="text-richblack-500">{user?.email}</p>
        </div>
        <button onClick={() => { navigate("/dashboard/setting") }} className="px-4 py-2 border border-richblack-300 rounded hover:bg-richblack-100">
          Edit
        </button>
      </div>

      {/* Section 2: About */}
      <div className='flex gap-2 justify-center items-center border-b-2 border-b-yellow-25 py-8 w-4/12'>
        <p className="text-xl font-semibold">About</p>
        <p className="text-yellow-100">{user?.additionalDetails?.about}</p>
        <button onClick={() => { navigate("/dashboard/setting") }} className="px-4 py-2 border border-richblack-300 rounded hover:bg-richblack-100">
          Edit
        </button>
      </div>

      {/* Section 3: Personal Details */}
      <div className='w-4/12 text-center space-y-4  py-6 '>
        <p className="text-xl font-semibold">Personal Details</p>

        {/* Personal Details Box */}
        <div className="p-4 bg-richblack-700 rounded-lg space-y-4 text-center  mx-auto  border-b-2 border-b-yellow-25 ">
          <PersonalDetailItem label="First Name" value={user?.firstName} />
          <PersonalDetailItem label="Last Name" value={user?.lastName} />
          <PersonalDetailItem label="Email" value={user?.email} />
          <PersonalDetailItem label="Phone" value={user?.additionalDetails?.contactNumber} />
          <PersonalDetailItem label="Gender" value={user?.additionalDetails?.gender} />
          <PersonalDetailItem label="Date of Birth" value={user?.additionalDetails?.dateOfBirth} />
        </div>

        <button onClick={() => { navigate("/dashboard/setting") }} className="px-4 py-2 border border-richblack-300 rounded hover:bg-richblack-100">
          Edit
        </button>
      </div>
    </div>

  );
};

export default Mysection;
