import StdVector, { stdVectorStringParse } from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"

// export const stdMapString2DomLibToken = (addr: NativePointer) => {
//     return new StdMap(addr, {
//         inspectElement: (ptr) => {
//             const keyPtr = ptr.add(16)
//             const valuePtr = keyPtr.add(24)
//             const result: Record<string, any> = {
//                 addr: ptr,
//                 key: '',
//                 value: '',
//             }
//             if (keyPtr.readU32() > 0)
//                 result.key = new StdString(keyPtr).toString() || ''
//             if (valuePtr.readU32() > 0) {
//                 result.value = new StrCache(valuePtr).toJSON()
//             }
//             return result
//         }
//     }).toJSON()
// }

export default class StrCache {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return stdMapString2IntParse(this.addr)
    }
    get offset_24() {
        return stdVectorStringParse(this.addr.add(24))
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
        }
    }
}