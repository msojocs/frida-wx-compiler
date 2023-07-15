import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";

export const hookCommon = (baseAddr: BaseAddr) => {
  
    {
        const funcName = 'WXML::EXPRLib::OutputAsStringOrKeyWord(std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> & a1,std::string const& a2, std::string const& a3, bool & a4)'
        const targetAddr = baseAddr.resolveAddress('0x0042B43D')
        // ReadFile
        if (targetAddr != null) {
            const arg: Record<string, NativePointer> = {}
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
                        
                        console.log(`${funcName} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] a1: ', args[0]);
                        console.log('[+] a2: ', new StdString(args[1]).toString());
                        console.log('[+] a3: ', new StdString(args[2]).toString());
                        console.log('[+] a4: ', args[3]);
                        arg.a1 = args[0]
                        arg.a2 = args[1]
                        arg.a3 = args[2]
                        arg.a4 = args[3]
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
                    /*
                    dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
                    console.log('[+] Returned from SomeFunc: ' + retval);
                    */
                    if (arg.a2) {
                        console.log('a2: ', new StdString(arg.a2).toString())
                    }
                    if (arg.a3) {
                        console.log('a3: ', new StdString(arg.a3).toString())
                    }
                    if (arg.a4) {
                        console.log('a4: ',arg.a4)
                    }
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}