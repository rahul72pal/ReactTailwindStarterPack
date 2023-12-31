import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method , url , bodyData, headers ,params) => {
    // console.log("headers IN THE APICONNECTOR = ",headers);
    console.log("Form Data in Create Sub section 3",bodyData);
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData  : null,
        headers: headers? headers: null,
        params: params ? params: null,
    });
}