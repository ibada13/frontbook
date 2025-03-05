'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";

export default function Type({ params }: { params: {id:number} }) { 
    const id = Number(params.id)||1
    const apiUrl = `/api/${id}/type`
    const TypeapiUrl = `/api/${id}/type`
    const { data: bookList, isLoading, error, mutate } = useSWR(apiUrl, fetcher);
    const { data: Type, isLoading:isLoadingType, error:errorType, mutate:mutateType } = useSWR(TypeapiUrl, fetcher);
    return (
        <AppLayout
        currentPage={id}
        middleware={'optional'}
        path={'/type/${id}/'}
        // totalPages={bookList?.last_page || null}
        >
            <div className="flex ">
                <div className="w-1/3">

                </div>
                <div className="w-4/6">
                    {/* { Type.description} */}
                </div>
                
            </div>
            </AppLayout>
    );
    
}