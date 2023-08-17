import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import StdDeque from "../../../../cpp/std_deque.js"
import WXSSBase from "./base.js"
import CSSSyntaxTree from "../../class/css_syntax_tree.js"

export default class WXSSParser {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        if (this.addr.readInt() == 0)
        {
            return 'empty'
        }
        return new CSSSyntaxTree(this.addr.readPointer()).toJSON()
    }
    get offset_8() {
        return new StdDeque(this.addr.add(8), 8, (ptr) => {
            return new WXSSBase(ptr.readPointer()).toJSON()
        }).toJSON()
    }
    get offset_48() {
        return new StdDeque(this.addr.add(8), 8, (ptr) => {
            return new CSSSyntaxTree(ptr.readPointer()).toJSON()
        }).toJSON()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_8: this.offset_8,
            offset_48: this.offset_48,
        }
    }
}