import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import CSSSyntaxTree from "./css_syntax_tree.js"

export default class XCompiler {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return this.addr.readInt()
    }
    get offset_4() {
        return this.addr.add(4).readInt()
    }
    get offset_8() {
        return new StdString(this.addr.add(8)).toString() || ''
    }
    get offset_32() {
        return new StdMap(this.addr.add(32), {
            inspectElement: (ptr) => {
                const keyPtr = ptr.add(16)
                const valuePtr = keyPtr.add(24)
                return {
                    key: new StdString(keyPtr).toString() || '',
                    value: new CSSSyntaxTree(valuePtr.readPointer()).toJSON()
                }
            }
        }).toJSON()
    }
    get offset_56() {
        return stdMapString2VectorStringParseJSON(this.addr.add(56))
    }
    get offset_128() {
        return stdMapString2IntParse(this.addr.add(128))
    }
    get offset_152() {
        return stdMapString2StringParseJSON(this.addr.add(152))
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_8: this.offset_8,
            offset_32: this.offset_32,
            offset_56: this.offset_56,
            offset_128: this.offset_128,
            offset_152: this.offset_152,
        }
    }
}