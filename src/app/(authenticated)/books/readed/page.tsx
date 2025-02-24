import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";

export default function Popular({ params }: { params: {id:number} }) { 
    const id = 1
    const apiUrl =`/api/books/readed?id=${id}` 

    return (
        <Books params={{id:id,apiUrl:apiUrl , middleware:"limitedguest" , path:"/books/readed/",}} />
    );
}