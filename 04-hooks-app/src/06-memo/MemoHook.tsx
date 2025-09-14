import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola');
    const [subTitle, setSubTitle] = useState('Mundo');

    const handleCallMyApi = useCallback(() => {
        console.log('llamar a mi API', subTitle)
    }, [subTitle])

  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-thin text-white">Memoapp</h1>
        <MyTitle title={title} />
        <MySubTitle subTitle={subTitle} callMyApi={handleCallMyApi} />
        <h2>Mi títulos</h2>
        <h6> Mi subtítulo </h6>
        <button onClick={()=> setTitle('Hello' + new Date().getTime())} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Cambiar titutlo</button>
        <button onClick={()=> setSubTitle('World' + new Date().getTime())} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Cambiar subtitulo</button>
    </div>
  )
}
