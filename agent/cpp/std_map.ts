/*
44 FC 97 00 00 00 00 00  30(起始) 6E D4 76 00 00 00 00
78 C9 E1 00(根元素) F8 A1 E1 00（元素）  68 E0 E1 00（元素） 08 00 00 00（个数）
00 00 E1 00 00 00 00 00  00 00 00 00 74 FC 97 00
74 FC 97 00 00 00 00 00  00 00 00 00 A0 E5 53 00
20 E5 53 00 E0 EE 53 00  40 E9 53 00 00 00 00 00
*/
/**
01 00 00 00 5C FC 97 00（父地址）  C0 BE DE 00（左子地址） 98 CD DE 00（右子地址）
F8 CE DE 00 2B 00 00 00(key)  2B 00 00 00 0D F0 AD BA
0D F0 AD BA 0D F0 AD BA  D8 B6 DE 00 DA 00 00 00(value)
 */

import { StdString } from "./std_string.js"

const BUF_SIZE = 16
export default class StdMap {
    private addr: NativePointer
    constructor(addr: NativePointer) {
        console.log('map ptr:', addr)
        this.addr = addr
    }
    get size() {
        return this.addr.add(20).readU32()
    }
    readElePair(ptr: NativePointer) {
        console.log('data:', ptr.readU64().toString(16))
        const keyPtr = ptr.add(16)
        const valuePtr = keyPtr.add(24)
        console.log('key:', keyPtr)
        console.log('value:', valuePtr)
        let data = '('
        if (keyPtr.readU32() > 0)
            data += new StdString(keyPtr).toString() + '='
        if (valuePtr.readU32() > 0)
            data += new StdString(valuePtr).toString()
        data += '),'
        return data
    }
    inorderTraverse(ptr: NativePointer) {
        const left = ptr.add(8)
        const right = left.add(4)
        let result: string = ''
        if (left.readU32() > 0)
            result += this.inorderTraverse(left.readPointer())
        result += this.readElePair(ptr)
        if (right.readU32() > 0)
            result += this.inorderTraverse(right.readPointer())
        return result
    }
    toString() {
        const startPtr = this.addr.add(8)
        let data = ''
        if (startPtr.readU32() > 0) {
            data = this.inorderTraverse(startPtr.readPointer())
        }
        return `StdMap{${data}}`
    }
}