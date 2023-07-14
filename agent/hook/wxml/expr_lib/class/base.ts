import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import { stdVectorExprLibToken } from "./token.js"

export const stdVectorSharedPtrBase = (addr: NativePointer) => {
    return new StdVector(addr, {
        elementSize: 8,
        introspectElement: (ptr) => {
            
            return new Base(ptr.readPointer()).toJSON()
        }
    }).toJSON()
}

export default class Base {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        // 这是一个回调方法的地址
        return this.addr.readPointer()
    }
    get offset_4() {
        const ptr = this.addr.add(4)
        switch(this.offset_0.toString())
        {
            case '0x55f20c':
                return new StdString(ptr).toString() || ''
                break;
            case '0x55f220':
                return new StdString(ptr).toString() || ''
                break;
            case '0x55f1e4':
                return ptr.readU32();
                return 
                break
            default:
                return this.addr.add(4).readPointer() + ' -> ' + this.addr.add(8).readPointer()
                break
        }
    }
    get offset_32() {
        // offset_4为字符串的时候，值才有意义
        return this.addr.add(32).readU32()
    }
    get offset_36() {
        // offset_4为字符串的时候，值才有意义
        const ptr = this.addr.add(36)
        switch(this.offset_0.toString())
        {
            case '0x55f20c':
                return new StdString(ptr).toString() || ''
                break;
            case '0x55f220':
                return new StdString(ptr).toString() || ''
                break;
            case '0x55f1e4':
                return 'not available';
                return 
                break
            default:
                return 'not available';
                break
        }
    }
    toJSON() {
        return {
            addr: this.addr,
            offset_0: this.offset_0,
            offset_4: this.offset_4,
            offset_32: this.offset_32,
            offset_36: this.offset_36,
        }
    }
}