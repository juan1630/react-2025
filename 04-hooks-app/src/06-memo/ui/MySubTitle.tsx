import { memo } from "react";

interface Props {
  subTitle: string;
  callMyApi: ()=> void
}

export const MySubTitle = memo(({ subTitle, callMyApi }: Props) => {
  console.log("tarea super pesada");
  return (
    <>
      <h6 className="text-2xl font-bold"> {subTitle} </h6>

      <button className="bg-indigo-500 text-white px-2 py-2 rounded-md cursor-pointer"
        onClick={callMyApi}
      >
        Llamar a la función
      </button>
    </>
  );
});
