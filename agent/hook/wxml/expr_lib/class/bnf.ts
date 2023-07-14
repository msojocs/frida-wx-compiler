import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import { stdVectorExprLibToken } from "./token.js"
import { stdVectorSharedPtrBase } from "./base.js"

export const stdVectorBNF = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 12,
        introspectElement: (ptr) => {
            
            return new BNF(ptr).toJSON()
        }
    }).toJSON()
}

export default class BNF {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return stdVectorSharedPtrBase(this.addr)
    }
    get offset_8() {
        return this.addr.add(8).readPointer()
    }
    get memoryStruct() {
        return `${this.addr.readPointer()} ${this.addr.add(4).readPointer()}\n${this.addr.add(8).readPointer()} ${this.addr.add(16).readPointer()}`
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_8: this.offset_8,
            memoryStruct: this.memoryStruct,
        }
    }
}