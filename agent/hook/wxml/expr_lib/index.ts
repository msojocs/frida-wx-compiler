import BaseAddr from "../../../hook/utils/addr.js"
import { hookCommon } from "./common.js"
import { hookExprSyntaxTree } from "./expr_syntax_tree.js"
import { hookBase } from "./hook_base.js"
import { hookBNF } from "./hook_bnf.js"
import { hookParser } from "./parser.js"
import { hookToken } from "./token.js"
import { hookTokenizer } from "./tokenizer.js"
import { hookTransitTable } from "./transit_table.js"
import { hookTransitTable2 } from "./transit_table/index.js"
export const hookExprLib = (baseAddr: BaseAddr) => {
    hookParser(baseAddr)
    hookExprSyntaxTree(baseAddr)
    hookTokenizer(baseAddr)
    hookCommon(baseAddr)
    // hookToken(baseAddr)
    // hookTransitTable(baseAddr)
    // hookTransitTable2(baseAddr)
    hookBase(baseAddr)
    // hookBNF(baseAddr)
}