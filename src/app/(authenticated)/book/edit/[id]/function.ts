import { put } from "@/hooks/userhooks";
export const editform = async(formData:any, apiurl?:string) => { 
    try {
        const response = await put(apiurl as string, formData);
        return response.book_id; 
    } catch (error) {
        console.error("Error posting book:", error);
    }
} 