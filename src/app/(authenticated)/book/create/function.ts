import { post } from "@/hooks/userhooks";
export const postform = async( formData:any ,apiurl?:string ) => { 
    try {
        const response = await post("/api/book", formData);
        return response.book_id; 
    } catch (error) {
        console.error("Error posting book:", error);
    }
} 

