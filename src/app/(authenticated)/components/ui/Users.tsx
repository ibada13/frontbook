"use client";

import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";
import TextDisplay from "../TextDisplay";
interface UserList {
    data: UserType[];
    last_page?: number;
  }
interface Params {
    id: number;
    apiUrl: string;
    middleware: string;
    path: string;
    componenttype?: "card" | "preview";
  }
export default function Users({ params }: { params: Params }) {
    const { id, apiUrl, middleware, path, componenttype } = params;
    const { data: users, error, isLoading } = useSWR<UserList>(apiUrl, fetcher);
  
    if (error) {
      console.error("Error fetching users:", error);
    }
  
    return (
      <AppLayout
        currentPage={id}
        middleware={middleware}
        path={path}
        totalPages={users?.last_page || null}
      >
        <div className="w-[90%] self-center flex flex-col justify-center items-center space-y-6 bg-black">
  
          {
            isLoading ? <TextDisplay text="يتم تحميل الكتب ...." />
              :
              error?<TextDisplay text="حدث خطأ أثناء تحميل الكتب." />:users?.data?.map((user:UserType, index:number) => (
                <UserCard key={index} user={user} />
            ))}
            </div>
        </AppLayout>
    );
}
