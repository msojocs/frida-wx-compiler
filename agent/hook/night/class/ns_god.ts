import StdVector, { stdVectorStringParse } from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSASTParse from "./ns_ast_parse.js"
import NSNode from "./ns_node.js"



export default class NSGod {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdVector(this.addr.add(0), {
            elementSize: 4,
            introspectElement: (ptr) => {
                return new GodsSon(ptr.readPointer()).toJSON()
            }
        })
    }
    toJSON() {
        return {
            type: 'NSGod',
            offset_0: this.offset_0,
        }
    }
}

export class GodsSon {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr).toString() || ''
    }
    get offset_24() {
        const ptr = this.addr.add(24)
        switch (this.offset_0) {
            case 'new std::vector<ns_node*>':
                {
                    const vecPtr = ptr.readPointer()
                    return new StdVector(vecPtr, {
                        elementSize: 4,
                        introspectElement: (elePtr2) => {
                            return new NSNode(elePtr2.readPointer()).toJSON()
                        }
                    }).toJSON()
                }
                break
            case 'new std::vector<std::vector<ns_node*>*>':
                {
                    const vecPtr = ptr.readPointer()
                    return new StdVector(vecPtr, {
                        elementSize: 4,
                        introspectElement: (elePtr) => {
                            const vecPtr2 = elePtr.readPointer()
                            return new StdVector(vecPtr2, {
                                elementSize: 4,
                                introspectElement: (elePtr2) => {
                                    return new NSNode(elePtr2.readPointer()).toJSON()
                                }
                            }).toJSON()
                        }
                    }).toJSON()
                }
                break
            default:
                return new NSNode(ptr.readPointer()).toJSON()
                // return [
                //     ptr.readPointer().readPointer(),
                //     ptr.readPointer().add(4).readPointer(),
                // ]
                break
        }
    }
    toJSON() {
        return {
            type: 'GodsSon',
            offset_0: this.offset_0,
            // offset_24: this.offset_24,
        }
    }
}