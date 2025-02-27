import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher, put } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";
import BooksPreview from "../../components/ui/Bookspreview";

export default function Popular({ params }: { params: {id:number} }) { 
    const id = 1
    const apiUrl = `/api/books/pending?id=${id}` 

    return (
        <BooksPreview  params={{id:id,apiUrl:apiUrl , middleware:"auth" , path:"/books/pending/",componenttype:"preview"}} />
    );
}