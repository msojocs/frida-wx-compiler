import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

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
                    value: 'std::shared_ptr<WXSS::CSSTreeLib::CSSSyntaxTree>'
                }
            }
        }).toJSON()
    }
    get offset_56() {
        return stdMapString2VectorStringParseJSON(this.addr.add(56))
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_8: this.offset_8,
            offset_32: this.offset_32,
            offset_56: this.offset_56,
        }
    }
}