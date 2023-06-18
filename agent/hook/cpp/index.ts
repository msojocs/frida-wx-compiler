import BaseAddr from "../utils/addr.js"
import { hookMap } from "./map/index.js"
import { hookVector } from "./vector/index.js"

export const hookCPP = (baseAddr: BaseAddr) => {
    hookMap(baseAddr)
    hookVector(baseAddr)
}