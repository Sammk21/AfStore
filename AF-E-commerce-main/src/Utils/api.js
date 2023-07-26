import axios from "axios"
import { STRAPI_API_TOKEN, API_URL } from "./url"


const tk = "e0c1e7a2845f8d7b08fdd0747db6833cdf358cbea4b69370c8a566d6237aa5b78d1366011843fc376d13e480f0f0e8b53381533ac33f160dcf639d0834f3e8509fb307c2062d01570a7adc0f81204f369d8972648c9fe69a664b587a5448b69618f831a8c5e11c04e5b44649d413f990a7745b6659750e19c71ea7c53d3e9292"

const params = {

    headers: {
        Authorization: "bearer " + tk

    },
};

export const fetchDataFromAPI = async (url) => {
    try {
        const { data } = await axios.get(API_URL + url, params);
        return data;
    } catch (error) {
        return error;
    }
}


export const makePaymentRequest = axios.create({
    baseURL: API_URL, 
    headers: {
        Authorization: "bearer " + tk,
    }
});

export const fetchPostalCode = async (url)=>{
    try{
        const {data} = await axios.get(url);
        return data;

    }catch(error){
        return (error);
    }
}

export const handleCalculate = async (totalAmount) => {
   return axios
      .get(`http://localhost:8080/payment/calculate?totalAmount=${totalAmount}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error
      });
  };

