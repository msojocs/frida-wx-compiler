import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"
import NSToken from "./ns_token.js"



export default class NSNode {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdString(this.addr.add(0)).toString() || ''
    }
    get offset_24() {
        return new StdString(this.addr.add(24)).toString() || ''
    }
    get offset_48() {
        return this.addr.add(48).readInt()
    }
    get offset_52() {
        // try {
            return this.addr.add(52).readInt()
        // } catch (error) {
        //     return 'error'
        // }
    }
    get offset_56() {
        return this.addr.add(56).readPointer()
    }
    get offset_60() {
        return new StdString(this.addr.add(60)).toString() || ''
    }
    get offset_84() {
        return new StdString(this.addr.add(84)).toString() || ''
    }
    get offset_108() {
        return new StdString(this.addr.add(108)).toString() || ''
    }
    get offset_132() {
        return new StdString(this.addr.add(132)).toString() || ''
    }
    get offset_156() {
        return new StdString(this.addr.add(156)).toString() || ''
    }
    get offset_180() {
        return this.addr.add(180).readPointer()
    }
    get offset_184() {
        return this.addr.add(184).readPointer()
    }
    get offset_188() {
        return this.addr.add(188).readPointer()
    }
    get offset_192() {
        const ptr = this.addr.add(192).readPointer()
        if (ptr.toInt32() != 0) {
            return new NSNode(ptr).toJSON()
        }
        return this.addr.add(192).readPointer()
    }
    get offset_196() {
        const ptr = this.addr.add(196).readPointer()
        if (ptr.toInt32() != 0) {
            return new StdVector(ptr, {
                elementSize: 4,
                introspectElement: (ptr2) => {
                    try {
                        return new NSNode(ptr2.readPointer()).toJSON()
                    } catch (error) {
                        return [
                            'error:',
                            ptr2.readPointer().readPointer(),
                            ptr2.readPointer().add(4).readPointer(),
                        ]
                    }
                }
            }).toJSON()
        }
        return this.addr.add(192).readPointer()
    }
    get offset_200() {
        return this.addr.add(200).readPointer()
    }
    get offset_224() {
        const vecPtr = this.addr.add(224).readPointer()
        if (vecPtr.toInt32() != 0) {
            return new StdVector(vecPtr, {
                elementSize: 4,
                introspectElement: (ptr) => {
                    // return new NSNode(ptr.readPointer()).toJSON()
                    return new StdVector(ptr.readPointer(), {
                        elementSize: 4,
                        introspectElement: (ptr2) => {
                            // return new NSNode(ptr2).toJSON()
                            return [
                                ptr2.readPointer().readPointer(),
                                ptr2.readPointer().add(4).readPointer(),
                            ]
                        }
                    }).toJSON()
                },
            }).toJSON()
        }
        return vecPtr
    }
    get offset_228() {
        return this.addr.add(228).readPointer()
    }
    get offset_232() {
        return this.addr.add(232).readPointer()
    }
    toJSON(): Record<string, any> {
        return {
            type: 'NSNode',
            offset_0: this.offset_0,
            offset_24: this.offset_24,
            offset_48: this.offset_48,
            offset_52: this.offset_52,
            offset_56: this.offset_56,
            offset_60: this.offset_60,
            offset_84: this.offset_84,
            offset_108: this.offset_108,
            offset_132: this.offset_132,
            offset_156: this.offset_156,
            offset_180: this.offset_180,
            offset_184: this.offset_184,
            offset_188: this.offset_188,
            offset_192: this.offset_192,
            offset_196: this.offset_196,
            // offset_200: this.offset_200,
            // offset_224: this.offset_224,
            // offset_228: this.offset_228,
            // offset_232: this.offset_232,
        }
    }
}