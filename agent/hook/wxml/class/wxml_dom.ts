import StdVector from "../../../cpp/std_vector.js"
import { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

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
    offset_72() {
        return stdVectorPtrWxmlDom(this.addr.add(72))
    }
    offset_272() {
        return stdMapString2StringParse(this.addr.add(272))
    }
    toJSON() {
        const result = {
            offset_0: this.offset_0(),
            offset_24: this.offset_24(),
            offset_72: this.offset_72(),
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