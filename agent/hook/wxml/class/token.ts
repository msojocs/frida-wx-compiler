import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

export const stdMapString2StringTemplatingToken = (addr: NativePointer) => {
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
            // result.value = new StringTemplatingToken(valuePtr).toJSON()
            
            return result
        }
    }).toJSON()
}
export const stdVectorStringTemplatingToken = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 28,
        introspectElement: (ptr) => {
            return new StringTemplatingToken(ptr).toJSON()
        }
    }).toJSON()
}

export default class StringTemplatingToken {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readPointer().toString()
    }
    get offset_4() {
        return new StdString(this.addr.add(4)).toString() || ''
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            // offset_60: this.offset_60,
        }
    }
}