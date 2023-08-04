import BaseAddr from "../utils/addr.js"
import { hookReadFile } from "../utils/file.js"

export const hookWcsc = (baseAddr: BaseAddr) => {
    hookReadFile(baseAddr)
}