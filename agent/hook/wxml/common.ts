import StdVector from "../../cpp/std_vector.js";
import { StdString } from "../../cpp/std_string.js";
import type BaseAddr from "../utils/addr.js";

export const hookCommon = (baseAddr: BaseAddr) => {

    // {
    //     const funcName = 'WXML::Compiler:'
    //     const targetAddr = baseAddr.resolveAddress('0x40A124')
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
    //                     console.log('[+] Argv0: ', args[0])
    //                     console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        
    //                     console.log('arg0:', args[0].toInt32())
    //                     console.log('arg1:', args[1].readUtf8String())
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
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
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXML::GetStrForMakingCSS(std::string const&,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0
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
    //                     i++
    //                     this.index = i
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('arg0:', readStdString(args[0]))
    //                     console.log('[+] a1: ', new StdString(args[0]))
                        
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
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
    //                 console.log('retval:', retval)
    //                 console.log(`${funcName} - onEnter${this.index}`);
    //             }
    //         });
    //     }
    // }
    {
        const funcName = 'WXML::StrSplitList4RPX(char const*,char const*,char const*,std::vector<std::pair<WXML::STRTOKEN,std::string>> &)'
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
                        console.log(`${funcName} - onEnter${this.index}`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] a1: ', args[0].readUtf8String())
                        console.log('[+] a2: ', args[1].readUtf8String())
                        console.log('[+] a3: ', args[2].readUtf8String())
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
                    /*
                    dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
                    console.log('[+] Returned from SomeFunc: ' + retval);
                    */
                    if (this.a4) {
                        const a4 = new StdVector(this.a4, {
                            elementSize: 28,
                            introspectElement: (ptr) => {
                                const ret = {
                                    first: ptr.readInt(),
                                    second: new StdString(ptr.add(4)).toString(),
                                }
                                
                            }
                        }).toJSON()
                        console.log('a4:', JSON.stringify(a4, null, 4))
                    }
                    console.log('retval:', retval)
                    console.log(`${funcName} - onEnter${this.index}`);
                }
            });
        }
    }
}