import React from 'react'
import { useSelector } from 'react-redux';
import Loading from './Loading';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/cors/Dashboard/Sidebar';
// import Mysection from '../components/cors/Auth/Mysection';

const MyProfile = () => {
    // console.log("My Profile");

    const { loading: authloading } = useSelector((state) => state.auth);
    const { loading: profileloading } = useSelector((state) => state.profile);
    const {token} = useSelector((state)=> state.auth);
    // console.log("TOKEN IN PROFILE SECTION = ",token);

    if (authloading || profileloading) {
        return (
            <Loading />
        )
    }

    return (
        <div className=' flex lg:h-[400px] h-screen   w-full  text-white ]'>
            <div className='h-[calc(100vh-3.5rem)]  w-1/6'><Sidebar /></div>
            <div className='h-[calc(100vh-3.5rem)] flex justify-center items-center overflow-auto w-[100%] '>
                <div className='mx-auto w-full h-full flex justify-center items-center'>
                    <Outlet />
                    {/* <Mysection/> */}
                </div>
            </div>
        </div>
    )
}

export default MyProfile
