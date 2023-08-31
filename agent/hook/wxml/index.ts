import BaseAddr from "../utils/addr.js";
import { hookCommon } from "./common.js";
import { hookCompiler } from "./compiler.js";
import { hookDomLib } from "./dom_lib/index.js";
import { hookExprLib } from "./expr_lib/index.js";
import { hookRPX } from "./rpx.js";
import { hookStringTemplating } from "./string_templating.js";

export const hookWXML = (baseAddr: BaseAddr) => {
    hookCompiler(baseAddr)
    // hookDomLib(baseAddr)
    // hookRPX(baseAddr)
    // hookCommon(baseAddr)
    // hookExprLib(baseAddr)
    // hookStringTemplating(baseAddr)
}