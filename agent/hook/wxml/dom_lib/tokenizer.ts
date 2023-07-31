import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";
import Token, { stdVectorDomLibToken } from "./class/token.js";
import Tokenizer from "./class/tokenizer.js";

export const hookTokenizer = (baseAddr: BaseAddr) => {
  
    // {
    //     const funcName = 'WXML::DOMLib::Tokenizer::Tokenizer'
    //     const targetAddr = baseAddr.resolveAddress('0x42B0EE')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         Interceptor.attach(targetAddr, { // Intercept calls to our SetAesDecrypt function

    //             // When function is called, print out its parameters
    //             /*
    //             以下内容演示了
    //             1. 怎么提取 printf 的第一个参数的字符串
    //             2. 怎么结合 onLever 做进入函数的时候获取 该函数要操作的内存和长度 ，等函数工作完毕，提取该数据
    //             其他API 用法
    //             https://frida.re/docs/javascript-api/
    //             */
    //             onEnter: function (args) {
    //                 try {
                        
    //                     console.log(`${funcName} - onEnter`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('arg0:', readStdString(args[0]))
    //                     // console.log('[+] Argv0: ', args[0].readUtf8String())
    //                     console.log('[+] Argv1: ', new StdString(args[1]).toString());
    //                 } catch (error) {
    //                     console.log('error:', error)
    //                 }
                    
    //                 /*
    //                 dumpAddr('Input', args[0], args[3].toInt32());
    //                 this.outptr = args[1]; // Store arg2 and arg3 in order to see when we leave the function
    //                 this.outsize = args[2].toInt32();
    //                 */
    //             },

    //             // When function is finished
    //             onLeave: function (retval) {
    //                 /*
    //                 dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
    //                 console.log('[+] Returned from SomeFunc: ' + retval);
    //                 */
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    {
        const funcName = 'WXML::DOMLib::Tokenizer::GetTokens(std::vector<WXML::DOMLib::Token> & a2,std::string & a3,std::vector<WXML::DOMLib::Token> &a4)'
        const targetAddr = baseAddr.resolveAddress('0x42AFB8')
        if (targetAddr != null) {
            let arg: Record<string, NativePointer> = {}
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
                        console.log('[+] a2: ', args[0])
                        console.log('[+] a3: ', new StdString(args[1]).toString());
                        console.log('[+] a4: ', args[2]);
                        arg.a2 = args[0]
                        arg.a4 = args[2]
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        const _this = new Tokenizer(ecx).toJSON()
                        console.log('this:', JSON.stringify(_this, null, 4))
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
                    console.log('retval:', retval)
                    if (arg.a2)
                        console.log('[+] a2: ', JSON.stringify(stdVectorDomLibToken(arg.a2), null, 4));
                    if (arg.a4)
                        console.log('[+] a4: ', JSON.stringify(stdVectorDomLibToken(arg.a4), null, 4));
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}