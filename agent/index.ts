import { log } from "./logger.js"
import { hookWcc } from './hook/wcc/index.js'
import BaseAddr from "./hook/utils/addr.js"
import { hookWXML } from './hook/wxml/index.js'
import { hookCPP } from "./hook/cpp/index.js"
import { hook } from "./hook/index.js"

(() => {
    const moduleName = 'wcc-sleep.exe'
    const _baseAddr = Module.findBaseAddress(moduleName);
    if (_baseAddr == null)
        throw new Error('baseAddr error!')
    const baseAddr = new BaseAddr(_baseAddr)
    hook(baseAddr)
})()