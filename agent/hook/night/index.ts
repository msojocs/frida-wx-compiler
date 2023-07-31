import BaseAddr from "../utils/addr.js";
import { hookNSASTParse } from "./ns_ast_parse.js";
import { hookNSCompileJs } from "./ns_compile_js.js";
import { hookNSGod } from "./ns_god.js";
import { hookNSStream } from "./ns_stream.js";
import { hookNSToken } from "./ns_token.js";
import { hookStr } from "./str.js";
export const hookNight = (baseAddr: BaseAddr) => {
    // hookStr(baseAddr)
    hookNSASTParse(baseAddr)
    // hookNSCompileJs(baseAddr)
    // hookNSStream(baseAddr)
    // hookNSGod(baseAddr)
    // hookNSToken(baseAddr)
}