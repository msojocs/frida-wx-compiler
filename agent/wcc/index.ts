import BaseAddr from "../utils/addr.js"
import { hookUsage } from "./usage.js"
import { hookReadFile } from "./file.js"

export const hookWcc = (baseAddr: BaseAddr) => {
    hookReadFile(baseAddr)
    hookUsage(baseAddr)
}