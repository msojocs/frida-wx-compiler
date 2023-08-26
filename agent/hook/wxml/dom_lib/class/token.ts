import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"

export const stdMapString2DomLibToken = (addr: NativePointer) => {
    return new StdMap(addr, {
        inspectElement: (ptr) => {
            const keyPtr = ptr.add(16)
            const valuePtr = keyPtr.add(24)
            const result: Record<string, any> = {
                addr: ptr,
                key: '',
                value: '',
            }
            if (keyPtr.readU32() > 0)
                result.key = new StdString(keyPtr).toString() || ''
            if (valuePtr.readU32() > 0) {
                result.value = new Token(valuePtr).toJSON()
            }
            return result
        }
    }).toJSON()
}

export const stdVectorDomLibToken = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 112,
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
        return new StdString(this.addr.readPointer()).toString() || ''
    }
    get offset_8() {
        return this.addr.add(8).readU32()
    }
    get offset_12() {
        return this.addr.add(12).readInt()
    }
    get offset_16() {
        return this.addr.add(16).readU32()
    }
    get offset_20() {
        return this.addr.add(20).readU32()
    }
    get offset_24() {
        return this.addr.add(24).readU32()
    }
    get offset_40() {
        return this.addr.add(40).readU32()
    }
    get offset_56() {
        return this.addr.add(56).readU32()
    }
    get offset_60() {
        return new StdString(this.addr.add(60).readPointer()).toString() || ''
    }
    toJSON() {
        return {
            // offset_0: this.offset_0,
            // offset_8: this.offset_8,
            offset_12: this.offset_12,
            offset_16: this.offset_16,
            offset_20: this.offset_20,
            offset_24: this.offset_24,
            // offset_40: this.offset_40,
            // offset_56: this.offset_56,
            // offset_60: this.offset_60,
        }
    }
}