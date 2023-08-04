import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import { stdMapString2DomLibToken } from "./token.js"

const stdVectorPtrWxmlDom = (addr: NativePointer): Record<string, any> => {
    const ret = new StdVector(addr, {
        introspectElement: (p) => {
            // console.log('introspectElement:', p)
            return new WxmlDom(p.readPointer()).toJSON() || 'empty'
        },
        elementSize: 0x8
    })
    const out = ret.toJSON()
    return out
}

const stdMapString2WxmlDom = (addr: NativePointer) => {
    return new StdMap(addr, {
        inspectElement: (ptr) => {
            const keyPtr = ptr.add(16)
            const valuePtr = keyPtr.add(24)
            const result: Record<string, any> = {
                key: '',
                value: '',
            }
            if (keyPtr.readU32() > 0)
                result.key = new StdString(keyPtr).toString() || ''
            if (valuePtr.readU32() > 0) {
                // result.value = new StdString(valuePtr).toString() || ''
                result.value = new WxmlDom(valuePtr.readPointer()).toJSON()
            }
            return result
        }
    }).toJSON()
}
export default class WxmlDom {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    offset_0() {
        return new StdString(this.addr).toString() || ''
    }
    offset_24() {
        return new StdString(this.addr.add(24)).toString() || ''
    }
    offset_48() {
        return stdMapString2DomLibToken(this.addr.add(48)) || ''
    }
    offset_72() {
        return stdVectorPtrWxmlDom(this.addr.add(72))
    }
    get offset_140() {
        return this.addr.add(140).readInt()
    }
    offset_272() {
        return stdMapString2StringParse(this.addr.add(272))
    }
    toJSON() {
        const result = {
            offset_0: this.offset_0(),
            offset_24: this.offset_24(),
            offset_48: this.offset_48(),
            offset_72: this.offset_72(),
            offset_140: this.offset_140,
            offset_272: this.offset_272(),
        }
        return result
    }
    toString() {
        const result = {
            offset_0: this.offset_0(),
            offset_24: this.offset_24(),
            offset_72: this.offset_72(),
            offset_272: this.offset_272(),
        }
        return JSON.stringify(result, null, 4)
    }
}