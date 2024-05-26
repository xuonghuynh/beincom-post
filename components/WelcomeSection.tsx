import AvataAndName from "@/components/AvataAndName";
import { useGetUsers } from "@/hooks/useGetUsers";
import { User } from "@prisma/client";
import React from "react";

const WelcomeSection = () => {
    const { data: users } = useGetUsers();
    console.log(users);
    return (
        <div>
            <div className="font-semibold text-neutral-600">
                Welcome new users
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {users?.map((user: User) => (
                    <AvataAndName key={user.id} name={user.name} image={user.image} email={user.email} />
                ))}
            </div>
        </div>
    );
};

export default WelcomeSection;
