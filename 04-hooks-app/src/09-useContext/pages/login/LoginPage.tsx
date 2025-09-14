import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginPage = () => {

  const [userId, setUserId] = useState("");
  const { login } = useContext(UserContext);
  const navigation = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(Number(userId));
    if (!result) {
      toast("Usuario no encontrado");
      return
    }
    navigation('/profile')
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar sesión</h1>

      <hr />

      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="numbre"
          placeholder="id del usuario"
          name=""
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <Button className="mt-4"> login </Button>
        <Link to="/about" className="mt-4">
          <Button variant="ghost"> Volver a la pagina principal </Button>
        </Link>
      </form>
    </div>
  );
};
