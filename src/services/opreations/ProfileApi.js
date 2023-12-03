import { toast } from "react-hot-toast"

import { setLoading} from "../../slices/authSlice"
// import { resetCart } from "../../slices/cardSlice"
// import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"


const {
    GET_USER_ENROLLED_COURSES_API,
    // GET_USER_DETAILS_API
    GET_INSTRUCTOR_DASHBOARD_COURSE_API
} = profileEndpoints;

// export async function getEnrollredCourses(token) {
//     // console.log("email=",email,"password=",password);
//     // return async (dispatch) => {

//     //   const toastId = toast.loading("Loading...")
//       // dispatch(setLoading(true))
//       console.log("Before Calling the api enrolled courses");

//       try {
//         console.log("Before Calling the api enrolled courses");
//         const response = await apiConnector("GET",
//          GET_USER_ENROLLED_COURSES_API,
//          null,
//          {
//           Authorization: `Bearer ${token}`
//         }
//         )
  
//         console.log(" GET_USER_ENROLLED_COURSES_API RESPONSE............", response)
  
//         if (!response.data.success) {
//           throw new Error(response.data.message)
//         }
  
//         toast.success("Your Courses")
//         // dispatch(setToken(response.data.token))
//         // const userImage = response.data?.user?.image
//         //   ? response.data.user.image
//         //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//         // dispatch(setUser({ ...response.data.user, image: userImage }))
//         // console.log("After set User from login = ",response.data.user)
//         // localStorage.setItem("token", JSON.stringify(response.data.token))
//         // localStorage.setItem("user", JSON.stringify(response.data.user))
//         // navigate("/dashboard/my-profile")
//         //  response
//         console.log("Before Calling the api enrolled courses");
//       } catch (error) {
//         console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//         // toast.error(`Login Failed = ${error.response.data.message}`)
//       }
//       // dispatch(setLoading(false))
//     //   toast.dismiss(toastId)
//     // }
//   }

export async function getEnrollredCourses(token) {
  const toastId = toast.loading("Loading...")
  setLoading(true);
  let result = []
  try {
    // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error(`Could Not Get Enrolled Courses ${error.response.data.message}`)
  }
  setLoading(false);
  toast.dismiss(toastId)
  return result
}

export async function getInstructorDashboard(token){
  // console.log("Toekn in the isntsdata =",token);
  const toastId = toast.loading("Loading...")
  let result = [];
  try {

    const response = await apiConnector("POST",GET_INSTRUCTOR_DASHBOARD_COURSE_API,null,
    {
      Authorisation: `Bearer ${token}`,
    });
    console.log("ResPONe GET_INSTRUCTOR_DASHBOARD_COURSE_API ",response);

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    result = response?.data?.data
  } catch (error) {
    console.log("Error in GET_INSTRUCTOR_DASHBOARD_COURSE_API =",error);
    toast.error(`Could Not Get Enrolled Courses ${error.response.data.message}`)
  }
  toast.dismiss(toastId);
  return result;
}