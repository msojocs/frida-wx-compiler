import StdVector, { stdVectorStringParse } from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSASTParse from "./ns_ast_parse.js"
import NSNode from "./ns_node.js"
import NSGod from "./ns_god.js"
import NSStream from "./ns_stream.js"



export default class NSToken {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new NSGod(this.addr.add(0).readPointer()).toJSON()
    }
    get offset_4() {
        const ptr = this.addr.add(4).readPointer()
        if (ptr.toInt32() === 0) {
            return ptr
        }
        return new NSStream(ptr).toJSON()
    }
    get offset_8() {
        const ptr = this.addr.add(8).readPointer()
        if (ptr.toInt32() === 0) {
            return ptr
        }
        return new NSNode(ptr).toJSON()
        // return [
        //     ptr.readPointer()
        // ]
    }
    get offset_12() {
        return this.addr.add(12).readPointer()
    }
    get offset_24() {
        return stdMapString2IntParse(this.addr.add(24))
        // return ''
    }
    toJSON() {
        return {
            type: 'NSToken',
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_8: this.offset_8,
            offset_12: this.offset_12,
            offset_24: this.offset_24,
        }
    }
}