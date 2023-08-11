import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

export default class CSSSyntaxTree {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr).toString()
    }
    get offset_24() {
        return this.addr.add(24).readPointer()
    }
    get offset_132() {
        const str = this.addr.add(132).readPointer()
        if (str.toInt32() > 0)
            return new StdString(str).toString()
        else
            return ''
    }
    get offset_164() {
        return this.addr.add(164).readPointer()
    }
    get offset_168() {
        return this.addr.add(168).readPointer()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_132: this.offset_132,
            offset_164: this.offset_164,
            offset_168: this.offset_168,
        }
    }
}