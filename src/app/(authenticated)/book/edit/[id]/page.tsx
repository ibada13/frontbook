'use client';
import Form from "@/app/ui/Form";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import useSWR from "swr";
import { fetcher, post, put } from "@/hooks/userhooks";
import { editform } from "./function";
const EditBook = ({ params }: { params: {id:string} }) => { 
    const id = Number(params.id) || 1;
    const apiUrl = `/api/book?id=${id}`;
    const { data: book, error,mutate, isLoading } = useSWR<any>(apiUrl, fetcher);
    console.log(book)
     const editform = async(formData:any) => { 
         const apiurl = `/api/book/${book.id}`
         formData.append("_method", "PUT");
         try {
            console.log(formData)
            const response = await post(apiurl , formData);
            return response.book_id; 
        } catch (error) {
            console.error("Error posting book:", error);
        }
    } 
    return (
        <AppLayout middleware="auth">
            {isLoading ?
            <p>is loading</p>
                : error ?
                    <p>is error</p> :
                    
                    <Form  onSubmit={editform}  book={book}/>
            }
        </AppLayout>
    );
}


export default EditBook