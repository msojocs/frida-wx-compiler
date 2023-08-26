import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse, stdVectorStringParseJSON } from "../../cpp/std_vector.js";
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2VectorStringParse } from "../../cpp/std_map.js";
import XCompiler from "./class/x_compiler.js";
import CSSSyntaxTree from "./class/css_syntax_tree.js";
import { StdStringStream } from "../../cpp/std_stringstream.js";

export const hookXCompiler = (baseAddr: BaseAddr) => {

    {
        const funcName = 'WXSS::XCompiler::XCompiler(std::map<std::string,std::string> const&,bool,std::string const&)'
        const targetAddr = baseAddr.resolveFunctionAddress(funcName)
        // ReadFile
        if (targetAddr != null) {
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        const a2 = new StdMap(args[0], {
                            inspectElement: (ptr) => {
                                const keyPtr = ptr.add(16)
                                const valuePtr = keyPtr.add(24)
                                return {
                                    key: new StdString(keyPtr).toString(),
                                    value: new StdString(valuePtr).size
                                }
                            }
                        }).toJSON()
                        // console.log('[+] arg0:', JSON.stringify(a2, null, 4))
                        console.log('[+] arg1:', args[1])
                        console.log('[+] arg2:', new StdString(args[2]).toString());
                        // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
                        const ctx = this.context as any as Record<string, NativePointer>
                        this.ecx = ctx.ecx
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
                    if (this.ecx) {
                        const t = new XCompiler(this.ecx).toJSON()
                        console.log(JSON.stringify(t, null, 4))
                    }
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }

    // {
    //     const funcName = 'WXSS::XCompiler::GetCommHead(std::vector<std::string> &,std::string&,bool,std::string const&)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0
    //         const argument: Record<string, NativePointer> = {}
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
    //                     console.log('[+] a2:', JSON.stringify(stdVectorStringParseJSON(args[0]), null, 4))
    //                     console.log('[+] a3:', new StdString(args[1]).toString())
    //                     console.log('[+] a4:', args[2]); // This pointer will store the de/encrypted data
    //                     console.log('[+] a5:', new StdString(args[3]).toString());
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     this.a2 = args[0]
    //                     this.a3 = args[1]
    //                     const t = new XCompiler(ecx).toJSON()
    //                     console.log(JSON.stringify(t, null, 4))
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
    //                 if (this.a2) {
                        
    //                     console.log('[+] a2:', JSON.stringify(stdVectorStringParseJSON(this.a2), null, 4))
    //                 }
    //                 if (this.a3) {
    //                     console.log('[+] a3:', new StdString(this.a3).toString())
    //                 }
    //                 if (this.ecx) {
    //                     const t = new XCompiler(this.ecx).toJSON()
    //                     console.log(JSON.stringify(t, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }

    // {
    //     const funcName = 'WXSS::XCompiler::GenExpr(zcc::shared_ptr<WXSS::CSSTreeLib::CSSSyntaxTree>,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &,std::string &)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0
    //         const argument: Record<string, NativePointer> = {}
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
    //                     // if (this.index != 4) return
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2:', args[0])
    //                     console.log('[+] a3:', args[1])
    //                     // console.log('[+] a4:', new StdString(args[2]).toString()); // This pointer will store the de/encrypted data
    //                     // const a2 = new CSSSyntaxTree(args[0].readPointer()).toJSON()
    //                     // console.log('a2:', JSON.stringify(a2, null, 4))
    //                     this.a2 = args[0]
    //                     this.a3 = args[1]

    //                     this.a4 = args[2]
    //                     // const ctx = this.context as any as Record<string, NativePointer>
    //                     // const ecx = ctx.ecx
    //                     // const t = new XCompiler(ecx).toJSON()
    //                     // console.log(JSON.stringify(t, null, 4))
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
    //                 // if (this.index != 4) return
    //                 console.log('retval:', retval)
    //                 if (this.a3) {
    //                     const ss = new StdStringStream(this.a3).toJSON()
    //                     console.log('[+] a3:', JSON.stringify(ss, null, 4));
    //                 }
    //                 if (this.a4) {
    //                     console.log('[+] a4:', new StdString(this.a4).toString());
    //                 }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'WXSS::XCompiler::DealRPX(std::string &,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0
    //         const argument: Record<string, NativePointer> = {}
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
    //                     console.log('[+] a2:', new StdString(args[0]).toString())
    //                     console.log('[+] a3:', args[1])
                        
    //                     // const a2 = new CSSSyntaxTree(args[0].readPointer()).toJSON()
    //                     // console.log('a2:', JSON.stringify(a2, null, 4))
    //                     this.a2 = args[0]
    //                     this.a3 = args[1]
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     // const t = new XCompiler(ecx).toJSON()
    //                     // console.log(JSON.stringify(t, null, 4))
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
    //                 if (this.a2) {
    //                     console.log('[+] a2:', new StdString(this.a2).toString());
    //                 }
    //                 if (this.a3) {
    //                     const a3 = new StdStringStream(this.a3).toJSON()
    //                     console.log('[+] a3:', JSON.stringify(a3, null, 4));
    //                 }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }

    // {
    //     const funcName = 'WXSS::XCompiler::MarkImported(std::string const&)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const argument: Record<string, NativePointer> = {}
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
                        
    //                     console.log('[+] a2:', new StdString(args[0]).toString())
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     if (this.ecx) {
    //                         const t = new XCompiler(ecx).toJSON()
    //                         console.log(JSON.stringify(t, null, 4))
    //                     }

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
    //                 if (this.ecx) {
    //                     const t = new XCompiler(this.ecx).toJSON()
    //                     console.log(JSON.stringify(t, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'WXSS::XCompiler::GetPageCss(std::string const&,std::string&,uint)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const argument: Record<string, NativePointer> = {}
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
                        
    //                     console.log('[+] a2:', new StdString(args[0]).toString())
    //                     console.log('[+] a3:', new StdString(args[1]).toString())
    //                     console.log('[+] a4:', args[2])
    //                     this.a3 = args[1]
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     if (this.ecx) {
    //                         const t = new XCompiler(ecx).toJSON()
    //                         console.log(JSON.stringify(t, null, 4))
    //                     }

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
    //                 if (this.a3)
    //                     console.log('[+] a3:', new StdString(this.a3).toString())
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'WXSS::XCompiler::GetHostRule(std::string &)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const argument: Record<string, NativePointer> = {}
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
                        
    //                     console.log('[+] a2:', new StdString(args[0]).toString())
    //                     this.a2 = args[0]
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     if (this.ecx) {
    //                         const t = new XCompiler(ecx).toJSON()
    //                         console.log(JSON.stringify(t, null, 4))
    //                     }

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
    //                 if (this.a2)
    //                     console.log('[+] a2:', new StdString(this.a2).toString())
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
}