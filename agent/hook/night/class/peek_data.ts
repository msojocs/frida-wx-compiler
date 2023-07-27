import StdVector, { stdVectorStringParse } from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSASTParse from "./ns_ast_parse.js"



export default class PeekData {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.add(0).readCString(1);
    }
    get offset_4() {
        return this.addr.add(4).readInt()
    }
    get offset_8() {
        return this.addr.add(8).readInt()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_8: this.offset_8,
        }
    }
}