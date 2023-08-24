import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../utils/addr.js";
import CSSSyntaxTree from "../class/css_syntax_tree.js";
import Rule from "../class/rule.js";
import WXSSParser from "./class/parser.js";

export const hookRule = (baseAddr: BaseAddr) => {
    
    // {
    //     const funcName = 'WXSS::CSSTreeLib::SPNotRule::MarkGood(WXSS::CSSTreeLib::CSSSyntaxTree *)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     ++i
    //                     this.index = i
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
    //                     // console.log('[+] a2:', new StdString(args[0]).toString());
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     this.a2 = args[0]
    //                     // const a1 = new Rule(this.ecx).toJSON()
    //                     // console.log('a1:', JSON.stringify(a1, null, 4))

    //                     const a2 = new CSSSyntaxTree(args[0]).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
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
    //                 if (this.a2) {
    //                     const a2 = new CSSSyntaxTree(this.a2).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
    //                 }
    //                 console.log('retval:', retval)
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXSS::CSSTreeLib::RuleChain::MarkGood(WXSS::CSSTreeLib::CSSSyntaxTree *)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     ++i
    //                     this.index = i
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
    //                     // console.log('[+] a2:', new StdString(args[0]).toString());
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     this.a2 = args[0]
    //                     // const a1 = new Rule(this.ecx).toJSON()
    //                     // console.log('a1:', JSON.stringify(a1, null, 4))

    //                     const a2 = new CSSSyntaxTree(args[0]).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
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
    //                 if (this.a2) {
    //                     const a2 = new CSSSyntaxTree(this.a2).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
    //                 }
    //                 console.log('retval:', retval)
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXSS::CSSTreeLib::ChildRule::MarkGood(WXSS::CSSTreeLib::CSSSyntaxTree *)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     ++i
    //                     this.index = i
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
    //                     // console.log('[+] a2:', new StdString(args[0]).toString());
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     this.a2 = args[0]
    //                     // const a1 = new Rule(this.ecx).toJSON()
    //                     // console.log('a1:', JSON.stringify(a1, null, 4))

    //                     const a2 = new CSSSyntaxTree(args[0]).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
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
    //                 if (this.a2) {
    //                     const a2 = new CSSSyntaxTree(this.a2).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
    //                 }
    //                 console.log('retval:', retval)
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXSS::CSSTreeLib::AndRules::MarkGood(WXSS::CSSTreeLib::CSSSyntaxTree *)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     ++i
    //                     this.index = i
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
    //                     // console.log('[+] a2:', new StdString(args[0]).toString());
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     this.a2 = args[0]
    //                     // const a1 = new Rule(this.ecx).toJSON()
    //                     // console.log('a1:', JSON.stringify(a1, null, 4))

    //                     const a2 = new CSSSyntaxTree(args[0]).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
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
    //                 if (this.a2) {
    //                     const a2 = new CSSSyntaxTree(this.a2).toJSON()
    //                     console.log('a2:', JSON.stringify(a2, null, 4))
    //                 }
    //                 console.log('retval:', retval)
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    {
        const funcName = 'WXSS::CSSTreeLib::RuleDebugRule::InsertOriginSelectorInfo(zcc::shared_ptr<WXSS::CSSTreeLib::CSSSyntaxTree>,int,zcc::shared_ptr<WXSS::CSSTreeLib::CSSSyntaxTree>)'
        const targetAddr = baseAddr.resolveFunctionAddress(funcName)
        // ReadFile
        if (targetAddr != null) {
            let i = 0;
            const argument: Record<string, NativePointer> = {}
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
                        ++i
                        this.index = i
                        console.log(`${funcName} - onEnter${this.index}`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
                        // console.log('[+] a2:', new StdString(args[0]).toString());
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        this.ecx = ecx
                        this.a2 = args[0].readPointer()
                        this.a3 = args[2].readPointer()
                        // const a1 = new Rule(this.ecx).toJSON()
                        // console.log('a1:', JSON.stringify(a1, null, 4))

                        const a2 = new CSSSyntaxTree(args[0].readPointer()).toJSON()
                        console.log('[+] a2:', JSON.stringify(a2, null, 4))
                        console.log('[+] a3:', args[1])
                        const a3 = new CSSSyntaxTree(args[2].readPointer()).toJSON()
                        console.log('[+] a3:', JSON.stringify(a3, null, 4))
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
                    if (this.a2) {
                        const a2 = new CSSSyntaxTree(this.a2).toJSON()
                        console.log('a2:', JSON.stringify(a2, null, 4))
                    }
                    if (this.a3) {
                        const a3 = new CSSSyntaxTree(this.a3).toJSON()
                        console.log('a2:', JSON.stringify(a3, null, 4))
                    }
                    console.log('retval:', retval)
                    console.log(`${funcName} - onLeave${this.index}\n\n`);
                }
            });
        }
    }
}