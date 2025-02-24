import useSWR from "swr";
import AppLayout from "../../layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";


export default function Popular({ params }: { params: {id:number} }) { 
    const id =  Number(params.id)||1;
    const apiUrl = `/api/books/pending?id=${id}`;
    const { data: bookList, error, isLoading } = useSWR<data>( apiUrl , fetcher);

    return (
        <AppLayout middleware="optional">
            l
        </AppLayout>
    );
}