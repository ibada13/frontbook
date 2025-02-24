import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";

export default function Popular({ params }: { params: {id:number} }) { 
    const id = Number(params.id)||1
    const apiUrl =`/api/books/popular?id=${id}` 
    return (
        <Books params={{id:id,apiUrl:apiUrl , middleware:"optional" , path:"/books/popular/",}} />
    );
}