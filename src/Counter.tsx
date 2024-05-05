import { useState } from "react"

export function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    return {
        count,
        increment: () => setCount(count + 1),
    }
}




export function Counter() {
    const counter = useCounter();
    
    return (
        <button onClick={counter.increment}>{counter.count}</button>
    )
}