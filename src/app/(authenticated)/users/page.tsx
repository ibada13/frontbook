"use client";

import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import UserCard from "@/app/ui/UserPreview";
import { UserType } from "@/types/User";

export default function Popular({ params }: { params: { id: number } }) {
    const id = 1;
    const apiUrl = `/api/users?id=${id}`;
    
    const { data: users, error, isLoading } = useSWR<UserType[]>(apiUrl, fetcher);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <AppLayout totalPages={users?.length || 1} currentPage={id} path="/users/" middleware="auth">
            <div className="w-full min-h-screen flex flex-col gap-y-8">

            {users?.map((user, index) => (
                <UserCard key={index} user={user} />
            ))}
            </div>
        </AppLayout>
    );
}
