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
        if (this.addr.add(4).readInt() > 0)
        {
            return [
                this.addr.add(4).readPointer(),
                this.addr.add(4).readPointer().readPointer(),
                this.addr.add(4).readPointer().add(4).readPointer(),
                this.addr.add(8).readPointer(),
                this.addr.add(8).readPointer().readPointer(),
                this.addr.add(8).readPointer().add(4).readPointer(),
            ]
        }
        return [
            this.addr.add(4).readPointer(),
            this.addr.add(8).readPointer(),
        ]
    }
    get offset_12() {
        return this.addr.add(12).readInt()
    }
    get offset_20() {
        return this.addr.add(20).readInt()
    }
    get offset_24() {
        return this.addr.add(24).readInt()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_12: this.offset_12,
            offset_20: this.offset_20,
            offset_24: this.offset_24,
        }
    }
}