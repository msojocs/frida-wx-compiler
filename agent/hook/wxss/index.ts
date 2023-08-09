import BaseAddr from "../utils/addr.js";
import { hookCommon } from "./common.js";
import { hookToken } from "./token.js";
import { hookTokenizer } from "./tokenizer.js";
import { hookXCompiler } from "./x_compiler.js";

export const hookWXSS = (baseAddr: BaseAddr) => {
    hookXCompiler(baseAddr)
    // hookToken(baseAddr)
    // hookCommon(baseAddr)
    // hookTokenizer(baseAddr)
}