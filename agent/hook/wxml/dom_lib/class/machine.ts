import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2StringParse } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"


export default class Machine {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get fileLength() {
        return this.addr.readU32()
    }
    get offset_4() {
        return this.addr.add(4).readU32()
    }
    get lineCount() {
        return this.addr.add(8).readU32()
    }
    get lineLength() {
        return this.addr.add(12).readU32()
    }
    get offset_16() {
        return this.addr.add(16).readU32()
    }
    get offset_20() {
        return this.addr.add(20).readU32()
    }
    get offset_24() {
        return this.addr.add(24).readU32()
    }
    get filePath() {
        return new StdString(this.addr.add(28)).toString() || ''
    }
    toJSON() {
        return {
            fileLength: this.fileLength,
            offset_4: this.offset_4,
            lineCount: this.lineCount,
            lineLength: this.lineLength,
            offset_16: this.offset_16,
            offset_20: this.offset_20,
            offset_24: this.offset_24,
            filePath: this.filePath,
        }
    }
}