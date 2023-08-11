import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import Rule from "./rule.js"

export default class LexicalChecker {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readInt()
    }
    get offset_4() {
        return new Rule(this.addr.add(4).readPointer()).toJSON()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
        }
    }
}