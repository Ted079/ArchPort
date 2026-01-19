import React from "react";
import type { IUser } from "../../../../shared/types/user.types";
import Button from "../../components/UI/Button";
import { EditIcon } from "../../components/UI/icons";

interface UserInfoProps {
  user: IUser;
}
const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex justify-center  px-4 pt-12 pb-6 mx-auto gap-8">
        <div className="flex justify-center ">
          <img
            className="h-20 w-20 sm:w-[5rem] sm:h-[5rem] flex-shrink-0 object-cover rounded-full"
            src={user.avatar}
            alt="user"
          />
        </div>

        <div className="flex flex-col   ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
            {user.name}
          </h2>

          <p className="block max-w-2xl mt-3 mb-3 text-gray-500 dark:text-gray-300">
            {user.email}
          </p>
          <Button children="Edit Profile" size="md" icon={<EditIcon />} />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
