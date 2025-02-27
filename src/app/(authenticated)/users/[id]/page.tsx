import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";
export default function Popular({ params }: { params: {id:number} }) { 
    const id = Number(params.id)||1
    const apiUrl =`/api/users/id=${id}` 
    const {data:users ,error ,isLoading } = useSWR(apiUrl , fetcher)
    return (
        <AppLayout
        totalPages={users?.last_page || null}
        currentPage={id}
            path="/users/" middleware="auth" >

            {users.map((user: UserType, index: number) => {
                <UserCard user={user}/>
             })}
        </AppLayout>
    );
}