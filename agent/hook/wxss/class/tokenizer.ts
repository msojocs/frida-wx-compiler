import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

export default class WXSSTokenizer {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr).toString()
    }
    get offset_24() {
        return new StdString(this.addr.add(24)).toString()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
        }
    }
}