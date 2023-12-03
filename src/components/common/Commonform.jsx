import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import Loading from '../../Pages/Loading'
import { toast } from 'react-hot-toast'
import countrycode from '../../data/countrycode.json'

const CommonForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const formsubmit = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("Response contact dofr =", response);
            setLoading(false);
            toast.success("Response Register");
        } catch (error) {
            console.log("Errorrr", error)
            setLoading(false);
            toast.error("Response Not Register");
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstname: "",
                lastname: "",
                email: "",
                message: "",
                phone: ""
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div>
            {
                loading ? (<div><Loading /></div>) :
                    (
                        <div className="max-w-lg text-blaxk mx-auto mt-10 p-4 bg-richblack-800 rounded-lg shadow-md w-10/12">
                            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <form onSubmit={handleSubmit(formsubmit)}>

                                <div className="mb-4">
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        className="mt-1 text-black p-2 w-full border rounded-md"
                                        placeholder="Your First Name"

                                        {...register("firstname", { required: true })}
                                    />
                                    {
                                        errors.firstname && (
                                            <span className='text-yellow-25 text-[14px]' >Plaese Enter Your Name</span>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="mt-1 p-2 text-black w-full border rounded-md"
                                        placeholder="Your Last Name"
                                        {...register("lastname", { required: true })}
                                    />
                                    {
                                        errors.lastname && (
                                            <span className='text-yellow-25' >Plaese Enter Your Name</span>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 p-2 text-black w-full border rounded-md"
                                        placeholder="Your Email"
                                        {...register("email", { required: true })}
                                    />
                                    {
                                        errors.email && (
                                            <span className='text-yellow-25' >Plaese Enter Your Email</span>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                                        Phone Number
                                    </label>
                                    <div className='flex justify-center items-center w-[100%]  gap-5'>
                                        {/* dropdown  */}
                                        <div className="flex justify-center w-[50%] ">
                                            <select name="" id="" className='p-2 bg-richblack-700 w-[100%] border-2'
                                                {...register("countrycode", { required: true })}
                                            >
                                                {
                                                    countrycode.map((option, index) => (
                                                        <option key={index} value={option.code}>
                                                            {option.code} {" "}
                                                            {option.country}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-4 w-full">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                            phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className=" mt-1 p-2 text-black w-full border rounded-md"
                                                placeholder="Your phone Email"
                                                {...register("phone", { 
                                                    required: { value: true, message: "Please enter the phone number" },
                                                    maxLength: { value: 10, message: "Invalid Phone number" },
                                                    minLength: { value: 10, message: "Invalid Phone number" }
                                                })}
                                            />
                                            {
                                                errors.phone && (
                                                    <span className='text-yellow-25' >Plaese Enter Your Valid Phone</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        className="mt-1 p-2 text-black w-full border rounded-md"
                                        placeholder="Your Message"
                                        {...register("message", { required: true })}
                                    ></textarea>
                                    {
                                        errors.message && (
                                            <span className='text-yellow-25' >Plaese Enter Your Message</span>
                                        )
                                    }
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    Send
                                </button>
                            </form>
                        </div >
                    )
            }
        </div >
    );
};

export default CommonForm;
