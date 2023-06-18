import BaseAddr from "../utils/addr.js"
import { hookUsage } from "./usage.js"
import { hookReadFile } from "./file.js"
import { hookCommon } from "./common.js"

export const hookWcc = (baseAddr: BaseAddr) => {
    hookReadFile(baseAddr)
    hookUsage(baseAddr)
    hookCommon(baseAddr)
}