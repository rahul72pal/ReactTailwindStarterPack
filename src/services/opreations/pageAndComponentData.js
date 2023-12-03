import React from 'react'
import {toast} from 'react-hot-toast'
import { catalogData } from '../apis';
import { apiConnector } from '../apiconnector';

const { 
    CATALOGPAGEDATA_API
} = catalogData;

export const getCatalogPageData = async(catalogId) => {
    const toastId = toast.loading("Loading ...");
    let result = [];
  try {
    const response = await apiConnector("POST" , CATALOGPAGEDATA_API ,{categoryId: catalogId});
    console.log("CATALOG PAGE DETAILS RESPONSE = ", response);
    if(!response?.data?.success){
        throw new Error("Cloud Not Fetch Category Page Details")
    }
    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR ...",error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

 