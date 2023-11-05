import {combineReducers} from '@reduxjs/toolkit';

import auhtReducers from '../slices/authSlice'
import ProfileReducers from '../slices/profileSlice'
import cardReducers from '../slices/cardSlice'


const rootReducer = combineReducers({
   auth : auhtReducers,
   profile:ProfileReducers,
   card:cardReducers
})

export default rootReducer;