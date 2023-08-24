import type BaseAddr from "../utils/addr.js";

export const hookRPX = (baseAddr: BaseAddr) => {

    {
        const funcName = 'WXML::RPX::accept(int (*)[266],bool *,int &,char const*)'
        const targetAddr = baseAddr.resolveFunctionAddress(funcName)
        // ReadFile
        if (targetAddr != null) {
            let i = 0
            Interceptor.attach(targetAddr, { // Intercept calls to our SetAesDecrypt function

                // When function is called, print out its parameters
                /*
                以下内容演示了
                1. 怎么提取 printf 的第一个参数的字符串
                2. 怎么结合 onLever 做进入函数的时候获取 该函数要操作的内存和长度 ，等函数工作完毕，提取该数据
                其他API 用法
                https://frida.re/docs/javascript-api/
                */
                onEnter: function (args) {
                    try {
                        i++
                        this.index = i
                        if (this.index > 10) return
                        console.log(`${funcName} - onEnter${this.index}`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] a1:', args[0].readInt())
                        console.log('[+] a2:', args[1])
                        console.log('[+] a3:', args[2].readInt())
                        console.log('[+] a4:', args[3].readUtf8String(10))
                        this.a1 = args[0]
                        this.a2 = args[1]
                        this.a3 = args[2]
                        this.a4 = args[3]
                        
                        // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
                    } catch (error) {
                        console.log('error:', error)
                    }
                    
                    /*
                    dumpAddr('Input', args[0], args[3].toInt32());
                    this.outptr = args[1]; // Store arg2 and arg3 in order to see when we leave the function
                    this.outsize = args[2].toInt32();
                    */
                },

                // When function is finished
                onLeave: function (retval) {
                    if (this.index > 10) return

                    console.log('retval:', retval)
                    if (this.a1)
                        console.log('[+] a1:', this.a1.readInt())
                    // if (this.a2)
                    //     console.log('[+] a2:', this.a2)
                    if (this.a3)
                        console.log('[+] a3:', this.a3.readInt())
                    if (this.a4)
                        console.log('[+] a4:', this.a4.readUtf8String(10))
                    console.log(`${funcName} - onLeave${this.index}\n\n`);
                }
            });
        }
    }
}