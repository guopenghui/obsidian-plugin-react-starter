import { expect, describe, it } from "@jest/globals"
import { sum } from "@/testTest"

describe("sum", () => {
    it("adds two numbers", () => {
        expect(sum(1, 2)).toBe(3)
    })

    it("adds two numbers 2 2", () => {
        expect(sum(2, 2)).toBe(4)
    })
})