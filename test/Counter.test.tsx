import "@testing-library/jest-dom/jest-globals"
import { expect, it} from "@jest/globals"
import { render, renderHook, fireEvent, screen, act} from "@testing-library/react"
import { Counter, useCounter } from "@/Counter"
import {describe} from "node:test"

describe("React", () => {
    it("Counter Component", () => {
        render(<Counter/>)

        const button = screen.getByText("0");
        expect(screen.getByText("0")).toBeInTheDocument()
        
        fireEvent.click(button)

        expect(screen.getByText("1")).toBeInTheDocument()
    })


    it("useCounter Hook", () => {
        const {result} = renderHook(() => useCounter())
        
        expect(result.current.count).toBe(0)
        act(() => {
            result.current.increment()
        })
        expect(result.current.count).toBe(1)
    })
    
})
