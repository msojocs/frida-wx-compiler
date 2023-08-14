import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

export default class WXSSToken {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readPointer()
    }
    get offset_4() {
        // return new StdString(this.addr.add(4).readPointer()).toString()
        const ptr = this.addr.add(4)
        if (ptr.readInt() > 0)
        {
            return new StdString(ptr.readPointer()).toString()
        }
        return ''
    }
    get offset_12() {
        return this.addr.add(12).readInt()
    }
    get offset_16() {
        return this.addr.add(16).readInt()
    }
    get offset_20() {
        return this.addr.add(20).readInt()
    }
    get offset_24() {
        return this.addr.add(24).readInt()
    }
    get offset_28() {
        return this.addr.add(28).readUtf8String()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_12: this.offset_12,
            offset_16: this.offset_16,
            offset_20: this.offset_20,
            offset_24: this.offset_24,
            offset_28: this.offset_28,
        }
    }
}