import { log } from "./logger.js"
import { hookWcc } from './hook/wcc/index.js'
import BaseAddr from "./hook/utils/addr.js"
import { hookWXML } from './hook/wxml/index.js'
import { hookCPP } from "./hook/cpp/index.js"
import { hook } from "./hook/index.js"
import { readMap } from "./utils/map.js"

(() => {
    const type = 'wcsc'
    const moduleName = type + '-sleep.exe'
    const _baseAddr = Module.findBaseAddress(moduleName);
    if (_baseAddr == null)
        throw new Error('baseAddr error!')
    const addrMap = readMap(type)
    const baseAddr = new BaseAddr(type, _baseAddr, addrMap)
    console.log('start hook')
    hook(baseAddr)
})()