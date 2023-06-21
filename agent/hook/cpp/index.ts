import BaseAddr from "../utils/addr.js"
import { hookMap } from "./map/index.js"
import { hookOther } from "./other/index.js"
import { hookStdString } from "./string/index.js"
import { hookStringStream } from "./stringstream/index.js"
import { hookVector } from "./vector/index.js"

export const hookCPP = (baseAddr: BaseAddr) => {
    hookMap(baseAddr)
    hookVector(baseAddr)
    hookStdString(baseAddr)
    hookOther(baseAddr)
    hookStringStream(baseAddr)
}