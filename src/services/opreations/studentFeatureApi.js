import { studentEndpoints } from "../apis";
import {toast} from 'react-hot-toast';
import {apiConnector} from '../apiconnector'
import rzplogo from '../../assets/Logo/Logo-Small-Light.png'
// import { setLoading } from "../../slices/authSlice";
import {setPaymentLoading} from '../../slices/courseSlice'
import {resetCart} from '../../slices/cardSlice'
const RAZORPAY_KEY = "rzp_test_YeC6DHm4JrFLRf";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} =studentEndpoints;

function loadScript(src) {
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse (token , courses , userDetails , navigate, dispatch){
    console.log(token , courses , userDetails , navigate, dispatch);
    const toastId = toast.loading("Loading...");
    try {
        //load the srcipt
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return ;
        }
        //initate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                  {courses},
                  {
                    Authorisation: `Bearer ${token}`,
                  });

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        console.log("RESPONSEE = ",orderResponse.data.data);

        console.log("RAZORPAY KEY = ",RAZORPAY_KEY);
        //options
        const options = {
            key: RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank ypu for purchasing the course",
            image: rzplogo,
            prefill:{
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response){
                //send successfull wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token);
                //verifyPayment
                verifyPayment({...response, courses}, token , navigate, dispatch);
            }
        }

        const pyamentObject = new window.Razorpay(options);
        pyamentObject.open();
        pyamentObject.on("payment.failed", function(response){
            toast.error("Oops, payment failed");
            console.log(response);
        })

    } catch (error) {
        console.log("PAYMENT API ERROR....",error);
        toast.error(`${error.message}`);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    console.log("res email of payment response = ",response.razorpay_payment_id);
    try {
      const res =  await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("send email of payment response = ",res);
    } catch (error) {
        console.log("Payment success email error...",error);
    }
}

//verify payment
async function verifyPayment(bodyData, token , navigate, dispatch){
    const toastId = toast.loading("Verifying Paymeny...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API , bodyData, {
            Authorisation: `Bearer ${token}`,
        })

        console.log("VERIFY PAYMENT RESPONSE = ",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment successfull, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify api error = ",error);
        toast.error("Cloud not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}