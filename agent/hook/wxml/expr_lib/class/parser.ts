import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import { stdVectorExprLibToken } from "./token.js"
import Base, { stdVectorSharedPtrBase } from "./base.js"
import StdDeque from "../../../../cpp/std_deque.js"
import ExprSyntaxTree from "./exper_syntax_tree.js"

export default class ExprParser {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdDeque(this.addr, 8, (ptr) => {
            return new Base(ptr.readPointer()).toJSON()
        }).toJSON()
    }
    get offset_40() {
        return new StdDeque(this.addr.add(40), 8, (ptr) => {
            return new ExprSyntaxTree(ptr.readPointer()).toJSON()
        }).toJSON()
    }
    get offset_80() {
        const p = this.addr.add(80).readPointer()
        if (p.toInt32() > 0)
        {
            return new ExprSyntaxTree(p).toJSON()
        }
        return null
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_40: this.offset_40,
            offset_80: this.offset_80,
        }
    }
}