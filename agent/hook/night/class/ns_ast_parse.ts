import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSToken from "./ns_token.js"
import NSGod from "./ns_god.js"



export default class NSASTParse {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr.add(0)).toString() || ''
    }
    get offset_24() {
        // nsgod
        return new NSGod(this.addr.add(24).readPointer()).toJSON()
    }
    get offset_28() {
        // nstoken
        return new NSToken(this.addr.add(28).readPointer()).toJSON()
    }
    get offset_36() {
        return this.addr.add(36).readInt()
    }
    get offset_40() {
        return this.addr.add(40).readInt()
    }
    get offset_44() {
        return new StdString(this.addr.add(44)).toString() || ''
    }
    get offset_60() {
        return new StdString(this.addr.add(60)).toString() || ''
    }
    toJSON() {
        return {
            type: 'NSASTParse',
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_28: this.offset_28,
            offset_36: this.offset_36,
            offset_40: this.offset_40,
            offset_44: this.offset_44,
            // offset_60: this.offset_60,
        }
    }
}