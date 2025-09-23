import Die from "./components/Die"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [numbersOnDices, setNumbersOnDices] = useState(() => generateAllNewDice())
  const btnRef = useRef(null)
  const gameWon = numbersOnDices.every(die => die.isHeld === true) && numbersOnDices.every(die => die.value === numbersOnDices[0].value)

  useEffect(() => {

      if(gameWon) btnRef.current.focus()
  }, [gameWon])


  function generateAllNewDice() {
    
    let arrayOfRandObjects = []

    for(let i = 0 ; i < 10; i++){
      
      const element = {
        id: nanoid(),
        value: Math.floor((Math.random() * 6) + 1),
        isHeld: false
      }
      arrayOfRandObjects.push(element)
    }

    return arrayOfRandObjects
  }

  const dices = numbersOnDices.map((object) => {
    return <Die key={object.id} id={object.id} number={object.value} isHeld={object.isHeld} hold={hold} />
  })

  function rollDice() {
    gameWon ? setNumbersOnDices(() => generateAllNewDice()) :
    setNumbersOnDices(oldDice => oldDice.map(die => die.isHeld ? die : {...die, value: Math.floor((Math.random() * 6) + 1)}))
  }

  function hold(id) {
    setNumbersOnDices(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {dices}
        </div>
        <div className="rollDiv">
          <button ref={btnRef} onClick={rollDice} className="roll">{gameWon ? "New Game" : "Roll"}</button>
        </div>
      </div>
    </main>
  )
}