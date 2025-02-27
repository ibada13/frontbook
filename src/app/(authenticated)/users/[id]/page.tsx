"use client";

import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";
import Users from "@/app/(authenticated)/components/ui/Users";
export default function UsersList({ params }: { params: { id: number } }) {
    const id = Number(params.id)||1;
    const apiUrl = `/api/users?id=${id}`;
    

    return (
        <Users params={{id:id , apiUrl:apiUrl , middleware :"auth", path:"/users/"}}/>
    );
}
