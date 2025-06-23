import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"  // // This gives you a unique ID
import Confetti from 'react-confetti'
import {useRef} from "react"
import {useEffect} from "react"

export default function App() {
 
    
    const [dice, setDice] = useState(() => generateAllNewDice())//this way wont rerender intlizing it each time state chamges ,the syntax differs only then calling directly
     let gameWon=false
      const buttonRef = useRef(null)//to reach a dom node from react
    
    function generateAllNewDice() { //returns an array of objects
        return new Array(10)
            .fill(0) // i did it before with form much easier to read
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld:false,
                  id: nanoid()
            }))
    }


    //won conditions 
    const held = dice.every(die => die.isHeld)
const firstValue = dice[0].value
const allSame = dice.every(die => die.value === firstValue)

if (held && allSame) {
      gameWon=true
}
    
        function hold(id) {
      setDice(prev=>prev.map(item=>item.id!==id?item:{...item, isHeld:!item.isHeld})
      
      
      )
    }
       const diceElements = dice.map(dieObj => (
 <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} handelHold={()=>{hold(dieObj.id)}}/>)
    )
    /**
     * Challenge: Update the `rollDice` function to not just roll
     * all new dice, but instead to look through the existing dice
     * to NOT role any that are being `held`.
     * 
     * Hint: this will look relatively similiar to the `hold`
     * function below. When we're "rolling" a die, we're really
     * just updating the `value` property of the die object.
     */


function rollDice() {
    setDice(prev =>
        prev.map(die => {
            return die.isHeld
                ? die
                : { ...die, value: Math.ceil(Math.random() * 6) }
        })
    )
}
function newGame(){
    setDice(generateAllNewDice())
}
   useEffect(() => {
    if (gameWon && buttonRef.current) { //not null anymore?
        buttonRef.current.focus()
    }
}, [gameWon])

    return (
        <main>
            {gameWon?<Confetti/>:null}
              <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
              <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={gameWon ?newGame:rollDice}>{!gameWon ? "Roll" : "New Game"}</button>
            
         
            
        </main>
    )
}