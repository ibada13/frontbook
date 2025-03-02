"use client";

import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";
import Users from "../components/ui/Users";
import Mods from "../components/ui/Mods";

export default function UsersList({ params }: { params: { id: number } }) {
    const id = 1;
    const apiUrl = `/api/mods?id=${id}`;
    

    return (
        <Mods params={{id:id , apiUrl:apiUrl , middleware :"auth", path:"/mods/"}}/>
    );
}
