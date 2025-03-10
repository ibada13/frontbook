'use client';
import Form from "@/app/ui/Form";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import useSWR from "swr";
import { fetcher } from "@/hooks/userhooks";

const EditBook = ({ params }: { params: {id:string} }) => { 
    const id = Number(params.id) || 1;
    const apiUrl = `/api/book?id=${id}`;
    const { data: book, error,mutate, isLoading } = useSWR<any>(apiUrl, fetcher);
    console.log(book)
    return (
        <AppLayout middleware="auth">
            {isLoading ?
            <p>is loading</p>
                : error ?
                    <p>is error</p> :
                    
        <Form book={book}/>
            }
        </AppLayout>
    );
}


export default EditBook