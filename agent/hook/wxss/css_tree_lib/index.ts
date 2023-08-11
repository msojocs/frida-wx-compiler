import BaseAddr from "../../utils/addr.js";
import { hookCommon } from "./../common.js";
import { hookToken } from "./../token.js";
import { hookTokenizer } from "./../tokenizer.js";
import { hookXCompiler } from "./../x_compiler.js";
import { hookCSSSyntaxTree } from "./css_syntax_tree.js";
import { hookLexicalChecker } from "./lexical_checker.js";

export const hookCSSTreeLib = (baseAddr: BaseAddr) => {
    // hookLexicalChecker(baseAddr)
    hookCSSSyntaxTree(baseAddr)
}