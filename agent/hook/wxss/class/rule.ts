import StdVector from "../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../cpp/std_map.js"
import { StdString } from "../../../cpp/std_string.js"

let count = 0;
export default class Rule {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
        count++
    }
    get offset_0() {
        return this.addr.readPointer()
    }
    get offset_4(): Record<string, any> {
        const type = this.offset_0.toString()
        switch (type) {
            case '0x519b40':
            case '0x519bb4':
                // vector<ptr>
                const t =  new StdVector(this.addr.add(4), {
                    elementSize: 8,
                    introspectElement: (ptr) => {
                        return new Rule(ptr.readPointer()).toJSON()
                        // return ''
                    },
                }).toJSON()
                t.type = 'vector<ptr>'
                return t
                break;
            case '0x519b84':
                // vector pair
                try {
                    const ret = new StdVector(this.addr.add(4), {
                        elementSize: 32,
                        introspectElement: (ptr) => {
                            const keyPtr = ptr
                            const valuePtr = keyPtr.add(24).readPointer()
                            const t = {
                                key: new StdString(keyPtr).toString(),
                                value: {},
                                // test: [
                                //     valuePtr.readPointer(),
                                //     valuePtr.add(4).readPointer(),
                                //     valuePtr.add(8).readPointer(),
                                //     valuePtr.add(12).readPointer(),
                                // ]
                            }
                            if ((t.key === 'SELECTOR' || t.key === '$NAME'))
                            {
                                t.value = 'stop' + count
                            }
                            else if (count < 80){
                                t.value = new Rule(valuePtr).toJSON()
                            }
                            else {
                                t.value = 'out of count'
                            }
                            return t
                        },
                    }).toJSON()
                    ret.type = 'vector<pair>'
                    return ret
                } catch (error) {
                    console.log('failed to parse: 0x519b84')
                }
                break
            
            case '0x519b00':
            case '0x519ad0':
            case '0x519a70':
            case '0x519ae8':
            case '0x519b6c':
            case '0x519aa0':
            case '0x519a58':
            case '0x519ab8':
                return {
                    type: 'empty',
                }
                // empty
                break
            case '0x519bcc':
                return new Rule(this.addr.add(4).readPointer()).toJSON()
                break
            default:
                return {
                    msg: `not supported! ${type}`
                }
                break;
        }
        return {}
    }
    get offset_8() {
        return this.addr.add(8).readPointer()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_8: this.offset_8,
        }
    }
}