import StdVector from "../../../../cpp/std_vector.js"
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2StringParseJSON, stdMapString2VectorStringParse, stdMapString2VectorStringParseJSON } from "../../../../cpp/std_map.js"
import { StdString } from "../../../../cpp/std_string.js"
import WXSSBase from "./base.js"

export default class WXSSTransitTable {
    
    private addr: NativePointer
    constructor(addr: NativePointer) {
        this.addr = addr
    }
    get offset_0() {
        return new StdMap(this.addr, {
            // std::map<int,std::map<std::string,std::vector<WXSS::CSSTreeLib::BNF>>>
            inspectElement: (ptr1) => {
                const keyPtr = ptr1.add(16)
                const valuePtr = keyPtr.add(4)
                const d = {
                    key: keyPtr.readU32(),
                    value: new StdMap(valuePtr, {
                        // std::map<std::string,std::vector<WXSS::CSSTreeLib::BNF>>
                        inspectElement: (ptr2) => {
                            const keyPtr = ptr2.add(16)
                            const valuePtr = keyPtr.add(24)
                            const d2 = {
                                key: new StdString(keyPtr).toString() || '',
                                value: new StdVector(valuePtr, {
                                    // std::vector<WXSS::CSSTreeLib::BNF>
                                    elementSize: 12,
                                    introspectElement: (ptr3) => {
                                        return new StdVector(ptr3, {
                                            // std::vector<std::shared_ptr<WXSS::CSSTreeLib::Base>>
                                            elementSize: 8,
                                            introspectElement: (ptr4) => {
                                                return new WXSSBase(ptr4.readPointer()).toJSON()
                                            }
                                        }).toJSON()
                                    },
                                }).toJSON()
                            }
                            return d2
                        }
                    })
                }
                return d
                // return ''
            }
        }).toJSON()
    }
    toJSON() {
        return {
            offset_0: this.offset_0,
        }
    }
}