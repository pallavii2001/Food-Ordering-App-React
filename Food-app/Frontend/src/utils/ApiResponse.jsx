import axios from 'axios';

const BASE_URL = 'http://localhost:3000/'; 

const ApiResponse = async (method, url, data=null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data: data
    });
 
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default ApiResponse;