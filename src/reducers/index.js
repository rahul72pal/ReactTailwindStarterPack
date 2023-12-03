import {combineReducers} from '@reduxjs/toolkit';

import auhtReducers from '../slices/authSlice'
import ProfileReducers from '../slices/profileSlice'
import cardReducers from '../slices/cardSlice'
import courseReducers from '../slices/courseSlice'
import viewCourseSlice from '../slices/viewCourseSlice'


const rootReducer = combineReducers({
   auth : auhtReducers,
   profile:ProfileReducers,
   card:cardReducers,
   course: courseReducers,
   viewCourse: viewCourseSlice
})

export default rootReducer;