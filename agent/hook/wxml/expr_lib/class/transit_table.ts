import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import { stdVectorExprLibToken } from "./token.js"
import Base, { stdVectorSharedPtrBase } from "./base.js"
import StdDeque from "../../../../cpp/std_deque.js"
import ExprSyntaxTree from "./exper_syntax_tree.js"
import { stdVectorBNF } from "./bnf.js"

export default class TransitTable {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdMap(this.addr, {
            inspectElement: (ptr) => {
                const keyPtr = ptr.add(16)
                const valuePtr = keyPtr.add(4)
                const a = {
                    key: keyPtr.readInt(),
                    // value: new StdMap(valuePtr, {
                    //     inspectElement: (p2) => {
                    //         const keyPtr = p2.add(16)
                    //         const valuePtr = keyPtr.add(24)
                    //         return {
                    //             key: new StdString(keyPtr).toString(),
                    //             value: stdVectorBNF(valuePtr)
                    //         }
                    //     }
                    // }).toJSON()
                    value: {},
                }
                if (a.key == 23) {
                    a.value = new StdMap(valuePtr, {
                        inspectElement: (p2) => {
                            const keyPtr = p2.add(16)
                            const valuePtr = keyPtr.add(24)
                            return {
                                key: new StdString(keyPtr).toString(),
                                value: stdVectorBNF(valuePtr)
                            }
                        }
                    }).toJSON()
                }
                return a
            }
        }).toJSON()
    }
    get offset_24() {
        return this.addr.add(40).readInt()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_24: this.offset_24,
        }
    }
}