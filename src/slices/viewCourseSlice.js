import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData :[],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectoures: 0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state , action)=>{
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action)=>{
            state.totalNoOfLectoures = action.payload
        },
        setCompletedNoOfLectures: (state, action) =>{
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action)=>{
            state.completedLectures = [...state.completedLectures , action.payload]
        },
    },
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedNoOfLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer