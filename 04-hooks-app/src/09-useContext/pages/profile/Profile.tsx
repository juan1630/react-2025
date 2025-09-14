import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button"
import { use } from "react";
import { useNavigate } from 'react-router'

export const Profile = () => {
  
  // const { user } = useContext(UserContext);
  const { user, logout } = use(UserContext)
  const navigation = useNavigate()


  const handleLogOut = () => {
    logout()
    navigation('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl" >Perfil del usuario</h1>
      <hr />
      <pre className="my-2 w-[80%]" >{JSON.stringify(user, null, 2)}</pre>

      <Button onClick={handleLogOut} variant='destructive'> log out </Button>
    </div>
  )
}
