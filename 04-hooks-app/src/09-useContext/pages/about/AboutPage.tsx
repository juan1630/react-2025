import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">About page</h1>
      <hr />
      <div className="flex flex-col gap-2 mt-4">
        {/* perfil de usuario si tiene sesion */}
        {isAuthenticated && (
          <Link
            className="hover:text-blue-500 underline text-2xl"
            to="/profile"
          >
            Perfil
          </Link>
        )}

        {isAuthenticated ? (
          <Button variant="destructive" className="mt-4" onClick={logout} >
            Salir
          </Button>
        ) : (
          <Link className="hover:text-blue-500 underline text-2xl" to="/login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
};
