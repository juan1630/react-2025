export interface User {
  id: number;
  name: string;
  location: string;
  rol: string;
}

export const getUserAction = async (id: number): Promise<User> => {
  console.log("Función llamada");
  await new Promise((res) => setTimeout(res, 2000));

  console.log("Función terminada");
  return {
    id: id,
    name: "José",
    location: "México",
    rol: "Estudiante",
  };
};
