import StdVector, { stdVectorStringParse } from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSASTParse from "./ns_ast_parse.js"
import NSNode from "./ns_node.js"
import NSGod from "./ns_god.js"



export default class NSStream {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr.add(0)).toString()
    }
    get offset_24() {
        return new StdString(this.addr.add(24)).toString()
    }
    get offset_48() {
        return this.addr.add(48).readInt()
    }
    get offset_52() {
        return this.addr.add(52).readInt()
    }
    get offset_56() {
        return this.addr.add(56).readInt()
    }
    toJSON() {
        return {
            type: 'NSStream',
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_48: this.offset_48,
            offset_52: this.offset_52,
            offset_56: this.offset_56,
        }
    }
}