import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"

export const stdVectorExprLibToken = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 28,
        introspectElement: (ptr) => {
            
            return new Token(ptr).toJSON()
        }
    }).toJSON()
}

export default class Token {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readU32()
    }
    get offset_4() {
        if (this.offset_0 == 0)
            return this.addr.add(4).readUtf8String()
        else
            return 'not available'
    }
    get offset_12() {
        if (this.offset_0 != 0)
            return new StdString(this.addr.add(12).readPointer()).toString() || ''
        else
            return 'not available'
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_12: this.offset_12,
        }
    }
}