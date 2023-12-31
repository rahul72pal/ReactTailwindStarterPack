import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { courseEndpoints } from '../apis';

const {
    COURSE_CATEGORIES_API,
    COURSE_DETAILS_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    GET_ALL_COURSE_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    EDIT_COURSE_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API

} = courseEndpoints;

export const getallcourse = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch ALL Course ")
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}
export const fetchCourseCategory = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API, { courseId });
        // console.log("COURSE_CATEGORIES_API RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("COURSE_CATEGORIES_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const fetchCourseDetails = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            COURSE_DETAILS_API,
            {
                courseId,
            },
            {
                Authorisation: `Bearer ${token}`,
            }
        )
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result;
}

export const getFullCourseDetials = async (data, token) => {
    const toastId = toast.loading("Loadingg..");
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                data,
            },
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result;
}

export const createSection = async (data, token) => {
    console.log("CREATE SECTION API DATA = ", data);
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE_SECTION_API = CREATE_SECTION_API = RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.updatecourse;
    } catch (error) {
        console.log("CREATE_SECTION_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const createSubSection = async (data, token) => {
    console.log("DATA IN THE CREATE SUB SECTION = ", data);
    console.log("Form Data in Create Sub section 2",data);
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE_SUBSECTION_API RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.updatesection
    } catch (error) {
        console.log("CREATE_SUBSECTION_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const createCourse = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, { courseId });
        console.log("COURSE_DETAILS_API RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("CREATE_COURSE_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const updateSection = async (data, token) => {
    console.log("UPDATE SUBSECTION API DATA = ", data)
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_SECTION_API RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SECTION_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const updateSubSection = async (data, token) => {
    console.log("UPDATED SUBSECTION DATA = ", data);
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_SUBSECTION_API RESPONSE = ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SUBSECTION_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
// edit the course details
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
// add the course details
export const addCourseDetails = async (data, token) => {
    console.log("data = ", data);
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...Loading");
    try {
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE SECTION API RESPONSE = ", response);
        if (!response?.data?.success) {
            throw new Error("CLOUD NOT DELETE THE SECTION")
        }
        toast.success("DELETE THE SECTION Successfully");
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR =", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...Loading");
    try {
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE_SUBSECTION_API API RESPONSE = ", response);
        if (!response?.data?.success) {
            throw new Error("CLOUD NOT DELETE_SUBSECTION_API")
        }
        toast.success("DELETE_SUBSECTION Successfully");
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE_SUBSECTION_API ERROR =", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//get instructor course Details 
export const getinstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("GET_ALL_INSTRUCTOR_COURSES_API API RESPONSE = ", response);

        if (!response?.data?.success) {
            throw new Error("CLOUD NOT GET_ALL_INSTRUCTOR_COURSES_API")
        }

        toast.success("INSTRUCTOR COURSES....");
        result = response?.data?.data;

    } catch (error) {
        console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR =", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//delete the course by instructor
export const deleteCourse = async (data, token) => {
    console.log("CREATE SECTION API DATA = ", data);
    // let result = [];
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorisation: `Bearer ${token}`,
        })

        console.log("DELETE_COURSE_API API RESPONSE = ", response);
        if (!response?.data?.success) {
            throw new Error("CLOUD NOT GET_ALL_INSTRUCTOR_COURSES_API")
        }

        toast.success("INSTRUCTOR COURSES....");

    } catch (error) {
        console.log("DELETE_COURSE_API ERROR =", error)
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return;
}

// create a rating for course
export const createRating = async (data, token) => {
    console.log("CREATETING RATING DATA AND TOKEN",data,token);
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR............", error.message);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return success
}

export const markLectureAsComplete = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    console.log("Mark complte data", data);
    try {
        const response = await apiConnector("POST" , LECTURE_COMPLETION_API, data,{
            Authorisation: `Bearer ${token}`,
        })
        console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE....",response);
        if(!response.data.message){
            throw new Error(response.data.error)
        }
        toast.success("Lecture Compltede")
        result = true
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API_ERRR...",error);
        toast.error(error.response.data.message);
        result = false 
    }
    toast.dismiss(toastId)
    return result;
}












