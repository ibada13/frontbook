"use client";

import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher, put } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";
import TextDisplay from "../TextDisplay";
import ModPreview from "@/app/ui/ModPreview";
interface UserList {
    data: UserType[];
    last_page?: number;
  }
interface Params {
    id: number;
    apiUrl: string;
    middleware: string;
    path: string;
  }
export default function Mods({ params }: { params: Params }) {
    const { id, apiUrl, middleware, path } = params;
    const { data: users, error, isLoading ,mutate} = useSWR<UserList>(apiUrl, fetcher);
  
    if (error) {
      console.error("Error fetching users:", error);
    }
    const handleBan = async (UserId: number) => {
      try {
          await put(`/api/users/${UserId}/ban`);
  
        mutate();
      } catch (error) {
        console.error("Error editing comment:", error);
      }
  };
  const handleAdmin = async (UserId: number) => {
    try {
        await put(`/api/${UserId}/admin`);

      mutate();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  const handleMod = async (UserId: number) => { 
    try {
      await put(`/api/${UserId}/mod`);

    mutate();
  } catch (error) {
    console.error("Error editing comment:", error);
  }
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
                <ModPreview onUnmod={handleMod } OnAdmin={handleAdmin} OnBan={handleBan} key={index} user={user} />
            ))}
            </div>
        </AppLayout>
    );
}
