import BaseAddr from "../../../hook/utils/addr.js"
import { hookToken } from "./token.js"
import { hookMachine } from "./machine.js"
import { hookParser } from "./parser.js"
import { hookTokenizer } from "./tokenizer.js"

export const hookDomLib = (baseAddr: BaseAddr) => {
    hookParser(baseAddr)
    hookTokenizer(baseAddr)
    hookMachine(baseAddr)
    hookToken(baseAddr)
}