import axios from "@/lib/axios";



const books = async () => {
    
      try {
        const response = await axios.get('/api/books');
        
        return response.data;
      } catch (err) {
        console.error("Error fetching books:", err);
        return null;
      }
    
    
};
const fetcher = async (url:string) => {
    try {
        const response = await axios.get(url);
        
      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  
  
};
const post = async (url: string ,data?:any) => {
  try {
    const response = await axios.post(url , data, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  })
    return response.data
  }
  catch (err) {
    console.error("err posting :  " , err); 
    return null
   }
}

const del = async (url: string) => {
    try {
        const response = await axios.delete(url);
      
        return response.data;
    } catch (err) {
        console.error("Error deleteing data:", err);
        return null;
    }
}
const put = async (url: string, data?: any) => { 
  try { 
    console.log("data :" ,data)
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
    },
    })
    return response.data
  } catch (err) { 
    console.error("err puting the data ", err)
    return null
  }
}



export {books , fetcher,del , post , put}