import BaseAddr from "../utils/addr.js";
import { hookCompiler } from "./compiler.js";

export const hookWXML = (baseAddr: BaseAddr) => {
    hookCompiler(baseAddr)
}