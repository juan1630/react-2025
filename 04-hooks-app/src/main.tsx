import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
// import { PokemonPage } from './03-example/PokemonPage'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { TasksApp } from './05-useReducer/Taskapp'
// import { ScrambleWords } from './05-useReducer/ScrambleWordsUseState'
// import { TrafficLightEffect } from './02-use-effect/TrafficLightEffect'
// import { TrafficLightWithHook } from './02-use-effect/TrafficLightWithHook'
// import { ScrambleWords } from './05-useReducer/ScrambleWords'
// import { MemoHook } from './06-memo/MemoHook'
// import { MemoCounter } from './06-memo/MemoCounter'
// import { InstagromApp } from './07-useOptimistic/InstagromApp'
// import { ClientInformation } from './08-use-suspense/ClientInformation'
import  { Toaster } from 'sonner'

import './index.css'
// import { getUserAction } from './08-use-suspense/api/get-user.action'
import { ProffesionalApp } from './09-useContext/ProffesionalApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster/>
    {/* <HooksApp/> */}
    {/* <TrafficLight/> */}
    {/* <TrafficLightEffect /> */}
    {/* <TrafficLightWithHook/> */}
    {/* <PokemonPage/> */}
    {/* <FocusScreen/> */}
    {/* <TasksApp/> */}
    {/* <ScrambleWords/> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter/> */}
    {/* <InstagromApp/> */}
    <ProffesionalApp/>

    {/* <Suspense fallback={<div className='bg-gradient  flex flex-col' > <h2 className='text-2xl' >Cargando...</h2> </div>} >
    <ClientInformation getUser={ getUserAction(1000) } />
    </Suspense> */}
  </StrictMode>,
)
