import { use, type Usable } from "react";
import { getUserAction, type User } from "./api/get-user.action";



interface Props {
    getUser: Usable<User>
}

const userPromise = getUserAction(100)

export const ClientInformation = ({ getUser }:Props) => {
    const user = use(getUser)
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white"> {use.name} # {user.id} </h2>
      <p className="text-white text-xl">{user.location}</p>
      <p className="text-white text-xl">{user.rol}</p>
    </div>
  );
};
