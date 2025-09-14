import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyCounterApp } from './counter/components/MyCounterApp'
import { GifsApp } from './gifs/GifsApp'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GifsApp/>
    <MyCounterApp/>
  </StrictMode>,
)
