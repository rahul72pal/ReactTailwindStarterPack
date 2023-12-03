import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../../Pages/Loading';
import Sidebarliks from './Sidebarliks';
// import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'
// import { AiFillSetting } from 'react-icons/ai'
import { logout } from '../../../services/opreations/authAPI'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';


const Sidebar = () => {

    const { user, loading: profileloading } = useSelector((state) => state.profile);
    const { loading: authloading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [
        confirmationmodal,
        setConfirmationModal
    ] = useState(null);

    if (authloading || profileloading) {
        return (
            <Loading />
        )
    }

    // console.log(user?.accountType);

    return (
        <div className="bg-gray-900 w-full h-full p-4 bg-richblack-800 ">
            <div className="text-white font-semibold text-xl mb-4">My Profile</div>
            <ul className="space-y-[120px]">
                <div className='flex flex-col gap-3 mb-4'>
                    {
                        sidebarLinks.map((link, index) => {
                            if (link.type && user?.accountType !== link.type) return null
                            else return (
                                <li key={index}>
                                    <Sidebarliks
                                        
                                        name={link.name}
                                        icon={link.icon}
                                        path={link.path}
                                    //  other={link.}
                                    />
                                </li>
                            )
                        })
                    }
                </div>
            </ul >
            <div className='w-[80%] h-[2px]  bg-richblack-500'></div>
            <div className='text-lg flex flex-col gap-3 mt-4 font-semibold'>
                <div>
                    <Sidebarliks
                        name={"Setting"}
                        icon={"VscSettingsGear"}
                        path={"/dashboard/setting"}
                    //  other={link.}
                    />
                </div>
                <button className='flex items-center gap-3'
                    onClick={() => {
                        setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Loggout,",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        });
                    }}
                >
                    <FiLogOut />
                    <p>Logout</p>
                </button>
            </div>

            {confirmationmodal && <ConfirmationModal modalData={confirmationmodal} />}
        </div >
    );
};

export default Sidebar;
