

export default class BaseAddr {
    private baseAddr
    private addrMap
    private type: 'wcc' | 'wcsc'
    private idaBaseMap: Record<'wcc' | 'wcsc', string> = {
        wcc: '0x400000',
        wcsc: '0x400000'
    }
    constructor(type: 'wcc' | 'wcsc', baseAddr: NativePointer, addrMap: Record<string, string>) {
        this.baseAddr = baseAddr
        this.addrMap = addrMap
        this.type = type
    }
    resolveAddress(addr: string) {
        if (this.baseAddr == null)
            throw new Error('baseAddr error!')
        var result;
        try {
            var idaBase = ptr(this.idaBaseMap[this.type]); // Enter the base address of jvm.dll as seen in your favorite disassembler (here IDA)
            var offset = ptr(addr).sub(idaBase); // Calculate offset in memory from base address in IDA database
            result = this.baseAddr.add(offset); // Add current memory base address to offset of function to monitor
            console.log('[+] New addr=' + result); // Write location of function in memory to console
        } catch (error) {
            console.log(error)
        }
        return result;
    }
    resolveFunctionAddress(functionName: string): NativePointer | null {
        if (this.baseAddr == null)
            throw new Error('baseAddr error!')
        var result = null;
        try {
            const addr = this.addrMap[functionName]
            if (addr == undefined) {
                console.log('addr not found!')
                return null
            }
            var idaBase = ptr(this.idaBaseMap[this.type]); // Enter the base address of jvm.dll as seen in your favorite disassembler (here IDA)
            var offset = ptr(`0x${addr}`).sub(idaBase); // Calculate offset in memory from base address in IDA database
            
            result = this.baseAddr.add(offset); // Add current memory base address to offset of function to monitor
            console.log('[+] New addr=' + result); // Write location of function in memory to console
        } catch (error) {
            console.log('resolveFunctionAddress:', error)
        }
        return result;
    }
}