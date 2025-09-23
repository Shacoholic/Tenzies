export default function Die({id, number, isHeld, hold}) {
  
    return (
        <>
        {isHeld ? <button className="clickedDie" onClick={() => hold(id) } aria-pressed={isHeld}
            aria-label={`Die with value ${number}, 
            ${isHeld ? "held" : "not held"}`}>{number}</button> : <button onClick={() => hold(id)} className="die">{number}</button>}
        </>
    )
}