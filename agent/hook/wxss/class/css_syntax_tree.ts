import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import WXSSToken from "./token.js"
import Token from "../../../hook/wxml/dom_lib/class/token.js"

export default class CSSSyntaxTree {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr).toString()
    }
    get offset_24() {
        return new WXSSToken(this.addr.add(24)).toJSON()
    }
    get offset_116() {
       return this.addr.add(116).readPointer()
    }
    get offset_120(): Record<string, any> {
       return new StdVector(this.addr.add(120), {
        elementSize: 8,
        introspectElement: (ptr) => {
            return new CSSSyntaxTree(ptr.readPointer()).toJSON()
            // return ''
        }
       }).toJSON()
    }
    get offset_132() {
        const str = this.addr.add(132).readPointer()
        if (str.toInt32() > 0)
        {
            return new StdString(str).toString()
        }
        return ""
    }
    get offset_140() {
        const str = this.addr.add(140)
        if (str.readInt() > 0)
            return new StdString(str).toString()
        else
            return ''
    }
    get offset_148() {
        // std::shared_ptr<>
        const cur = this.addr.add(148).readPointer()
        if (cur.toInt32() > 0)
            return [
                new StdString(cur).toString(),
                new StdString(cur.add(24)).toString(),
                new StdString(cur.add(48)).toString(),
            ]
        else
            return []
    }
    get offset_156() {
        // return this.addr.add(156).readInt()
        const token = this.addr.add(156).readPointer()
        if (token.toInt32() > 0)
        {
            return new Token(token).toJSON()
        }
        return 
    }
    get offset_164() {
        return this.addr.add(164).readInt()
    }
    get offset_168() {
        return this.addr.add(168).readInt()
    }
    get offset_172() {
        return this.addr.add(172).readInt()
    }
    toJSON() {
        return {
            // addr: this.addr,
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_116: this.offset_116,
            // vec ok
            // offset_120: this.offset_120,
            offset_132: this.offset_132,
            // offset_140: this.offset_140,
            // offset_148: this.offset_148,
            offset_156: this.offset_156,
            // offset_164: this.offset_164,
            // offset_168: this.offset_168,
            // offset_172: this.offset_172,
        }
    }
}