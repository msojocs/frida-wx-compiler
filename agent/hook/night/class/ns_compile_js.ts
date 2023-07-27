import StdVector, { stdVectorStringParse } from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSASTParse from "./ns_ast_parse.js"



export default class NSCompileJS {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr.add(0)).toString() || ''
    }
    get offset_24() {
        return new NSASTParse(this.addr.add(24).readPointer()).toJSON()
    }
    get offset_28() {
        return stdVectorStringParse(this.addr.add(28).readPointer())
    }
    get offset_36() {
        return this.addr.add(36)
    }
    get offset_48() {
        return this.addr.add(48)
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_28: this.offset_28,
            offset_36: this.offset_36,
            offset_48: this.offset_48,
        }
    }
}