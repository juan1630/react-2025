import { useState } from 'react'

// import './itemCounter.css'
import styles from './itemCounter.module.css'

interface Props  {
  name: string
  quantity?: number
}

export const ItemCounter = ({name, quantity = 1}: Props) => {

  const [ count, setCount ] = useState(quantity)

  const handleAdd = () => {
    console.log('desde el counter')
    setCount((prevCount) => {
      return prevCount +1
    })
  }
  const handleSubtract = () => {
    setCount((prevCount) => {
      if(prevCount >= 1){
        return prevCount -1;
      }
      return prevCount
    })
  }

  return (
    <section 
      // style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}  
      className={styles['item-row']}
      >
        <span style={{ color: count == 1 ? 'red' : 'black'}} className={styles['item-name-width']} > {name}</span>
        <button
          onClick={handleAdd}
        > +1</button>
        <span> { count } </span>
        <button onClick={handleSubtract} > -1</button>
        <button className={styles['color-red']} >Eliminar</button>
    </section>
  )
}
