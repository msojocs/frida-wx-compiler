import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"

export default class WXSSBase {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readPointer()
    }
    get offset_4() {
        return new StdString(this.addr.add(4)).toString()
    }
    get offset_4_int() {
        return this.addr.add(4).readInt()
    }
    get offset_8() {
        return this.addr.add(8).readPointer()
    }
    get offset_28() {
        return this.addr.add(28).readInt()
    }
    get offset_32() {
        return this.addr.add(32).readInt()
    }
    get offset_36() {
        return new StdString(this.addr.add(36)).toString()
    }
    toJSON() {
        const type = this.offset_0.toString()
        switch(type) {
            case '0x519b58':
            case '0x519b2c':
                return {
                    type: 'base',
                    offset_0: this.offset_0,
                    offset_4: this.offset_4,
                    offset_28: this.offset_28,
                    offset_32: this.offset_32,
                    offset_36: this.offset_36
                }
                break;
            case '0x519a44':
                return {
                    type: 'base',
                    offset_0: this.offset_0,
                    offset_4: this.offset_4_int,
                    offset_8: this.offset_8,
                }
                break;
            case '0x519b18':
                return {
                    type: 'base',
                    offset_0: this.offset_0,
                }
                break;
            default:
                return {
                    type: 'base',
                    offset_0: this.offset_0,
                    error: 'not supported!'
                }
                break
        }
    }
}