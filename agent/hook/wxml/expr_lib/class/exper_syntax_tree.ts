import { StdString } from "../../../../cpp/std_string.js"
import StdVector from "../../../../cpp/std_vector.js"


export const stdVectorSharedExprSyntaxTree = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 8,
        introspectElement: (ptr) => {
            // return ''
            return new ExprSyntaxTree(ptr.readPointer()).toJSON()
        }
    }).toJSON()
}

export default class ExprSyntaxTree {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr).toString() || ''
    }
    get offset_24() {
        return this.addr.add(24).readPointer().toString()
    }
    get offset_28() {
        return this.addr.add(28).readPointer().toString()
    }
    get offset_52() {
        return stdVectorSharedExprSyntaxTree(this.addr.add(52))
    }
    toJSON() {
        const ret: Record<string, any> = {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_28: this.offset_28,
            offset_52: this.offset_52,
        }
        return ret
    }
}