import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse } from "../../cpp/std_vector.js";
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2VectorStringParse } from "../../cpp/std_map.js";
import NSNode from "./class/ns_node.js";
import NSASTParse from "./class/ns_ast_parse.js";

export const hookNSASTParse = (baseAddr: BaseAddr) => {
    
    // {
    //     const funcName = 'night::NSASTParse::top_down(void)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
    //         const arg: Record<string, NativePointer> = {}
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
    //                     if (this.index > 5) return
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     arg.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // console.log('[+] a1: ', new StdString(args[0]).toString())
    //                     // console.log('[+] a2: ', new StdString(args[1]).toString());
    //                     // console.log('[+] a3: ', new StdString(args[2]).toString());
    //                     // arg.a3 = args[2]
                        
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
    //                 if (this.index > 5) return
    //                 console.log('retval:', retval)
    //                 const ret = new NSNode(retval).toJSON()
    //                 console.log('value:', JSON.stringify(ret, null, 4))
    //                 if (arg.ecx) {
    //                     const _this = new NSASTParse(arg.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::ast_trans_kw(void)'
    //     const targetAddr = baseAddr.resolveAddress('0x00411396')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // console.log('[+] a1: ', new StdString(args[0]).toString())
    //                     // console.log('[+] a2: ', new StdString(args[1]).toString());
    //                     // console.log('[+] a3: ', new StdString(args[2]).toString());
    //                     // arg.a3 = args[2]
                        
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
    //                 const ret = new NSNode(retval).toJSON()
    //                 console.log('value:', JSON.stringify(ret, null, 4))
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::ast_expression(void)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     if (this.index > 10) return 
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // console.log('[+] a1: ', new StdString(args[0]).toString())
    //                     // console.log('[+] a2: ', new StdString(args[1]).toString());
    //                     // console.log('[+] a3: ', new StdString(args[2]).toString());
    //                     // arg.a3 = args[2]
                        
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
    //                 if (this.index > 10) return 
    //                 console.log('retval:', retval)
    //                 const ret = new NSNode(retval).toJSON()
    //                 console.log('value:', JSON.stringify(ret, null, 4))
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    {
        const funcName = 'night::NSASTParse::ast_dispatch(bool)'
        const targetAddr = baseAddr.resolveFunctionAddress(funcName)
        // ReadFile
        if (targetAddr != null) {
            let i = 0;
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
                        this.index = i;
                        this.output = this.index == 409
                        if (!this.output) return
                        console.log(`${funcName}${this.index} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        this.ecx = ecx
                        const _this = new NSASTParse(ecx).toJSON()
                        console.log('NSASTParse:', JSON.stringify(_this, null, 4))
                        console.log('[+] a2: ', args[0])
                        // console.log('[+] a2: ', new StdString(args[1]).toString());
                        // console.log('[+] a3: ', new StdString(args[2]).toString());
                        // arg.a3 = args[2]
                        
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
                    if (!this.output) return
                    console.log('retval:', retval)
                    const ret = new NSNode(retval).toJSON()
                    console.log('value:', JSON.stringify(ret, null, 4))
                    if (this.ecx) {
                        const _this = new NSASTParse(this.ecx).toJSON()
                        console.log('NSASTParse:', JSON.stringify(_this, null, 4))
                    }
                    // if (arg.a3) {
                    //     console.log('[+] a3: ', new StdString(arg.a3).toString());
                    // }
                    console.log(`${funcName}${this.index} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'night::NSASTParse::ast_obj_dot(night::ns_node *)'
        const targetAddr = baseAddr.resolveAddress('0x004144FA')
        // ReadFile
        if (targetAddr != null) {
            let i = 0;
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
                        this.output = this.index == 78
                        if (!this.output) return 
                        console.log(`${funcName} - onEnter${this.index}`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        const _this = new NSASTParse(ecx).toJSON()
                        console.log('NSASTParse:', JSON.stringify(_this, null, 4))
                        const arg0 = new NSNode(args[0]).toJSON()
                        console.log('[+] a2: ', JSON.stringify(arg0, null, 4))
                        // arg.a3 = args[2]
                        
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
                    if (!this.output) return 
                    console.log('retval:', retval)
                    try {
                        const ret = new NSNode(retval).toJSON()
                        console.log('value:', JSON.stringify(ret, null, 4))
                    
                    } catch (error) {
                         console.log('retval error', error)
                    }
                    // if (arg.a3) {
                    //     console.log('[+] a3: ', new StdString(arg.a3).toString());
                    // }
                    console.log(`${funcName} - onLeave${this.index}\n\n`);
                }
            });
        }
    }
    // {
    //     const funcName = 'night::NSASTParse::make_binary_or_just_value(night::ns_node * a2, bool a3)'
    //     const targetAddr = baseAddr.resolveAddress('0x00413B64')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i= 0;
    //         const arg: Record<string, NativePointer> = {}
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
    //                     this.index = i;
    //                     if (this.index != 233 && this.index != 234) return
    //                     console.log(`${funcName} - onEnter${this.index}`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     arg.ecx = ecx
    //                     console.log('[+] a3:', args[1])
    //                     const arg0 = new NSNode(args[0]).toJSON()
    //                     console.log('[+] a2: ', JSON.stringify(arg0, null, 4))
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (this.index != 233 && this.index != 234) return
    //                 console.log('retval:', retval)
    //                 try {
    //                     const ret = new NSNode(retval).toJSON()
    //                     console.log('value:', JSON.stringify(ret, null, 4))
                    
    //                 } catch (error) {
    //                      console.log('retval error', error)
    //                 }
    //                 if (arg.ecx) {
    //                     const _this = new NSASTParse(arg.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave${this.index}\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::is_op_self(bool a2)'
    //     const targetAddr = baseAddr.resolveAddress('0x00410A5A')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     // const _this = new NSASTParse(ecx).toJSON()
    //                     // console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     console.log('[+] a2: ', args[0])
    //                     // arg.a3 = args[2]
                        
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
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    {
        const funcName = 'night::NSASTParse::make_call_or_just_expression(night::ns_node *)'
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
                        this.output = this.index == 738
                        if (!this.output) return
                        console.log(`${funcName}${this.index} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        const _this = new NSASTParse(ecx).toJSON()
                        console.log('NSASTParse:', JSON.stringify(_this, null, 4))
                        console.log('[+] a2: ', JSON.stringify(new NSNode(args[0]).toJSON(), null, 4))
                        // arg.a3 = args[2]
                        
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
                    if (!this.output) return
                    console.log('retval:', retval)
                    if (retval.toInt32() > 0) {
                        const r = new NSNode(retval).toJSON()
                        console.log('[+] a3: ', JSON.stringify(r, null, 4));
                    }
                    // if (arg.a3) {
                    //     console.log('[+] a3: ', new StdString(arg.a3).toString());
                    // }
                    console.log(`${funcName}${this.index} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'night::NSASTParse::ast_call(night::ns_node *)'
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
                        this.output = this.index == 32
                        if (!this.output) return
                        console.log(`${funcName}${this.index} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        const _this = new NSASTParse(ecx).toJSON()
                        console.log('NSASTParse:', JSON.stringify(_this, null, 4))
                        console.log('[+] a2: ', JSON.stringify(new NSNode(args[0]).toJSON(), null, 4))
                        // arg.a3 = args[2]
                        
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
                    if (!this.output) return
                    console.log('retval:', retval)
                    if (retval.toInt32() > 0) {
                        const r = new NSNode(retval).toJSON()
                        console.log('[+] a3: ', JSON.stringify(r, null, 4));
                    }
                    // if (arg.a3) {
                    //     console.log('[+] a3: ', new StdString(arg.a3).toString());
                    // }
                    console.log(`${funcName}${this.index} - onLeave\n\n`);
                }
            });
        }
    }
    
    // {
    //     const funcName = 'night::NSASTParse::make_list_by_parser(std::string const&,std::string const&,std::string const&,std::string const&,bool,int,std::string)	.text	'
    //     const targetAddr = baseAddr.resolveAddress('0x00414AC0')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     console.log('[+] a3: ', new StdString(args[1]).toString())
    //                     console.log('[+] a4: ', new StdString(args[2]).toString())
    //                     console.log('[+] a5: ', new StdString(args[3]).toString())
    //                     console.log('[+] a6: ', args[4])
    //                     console.log('[+] a7: ', args[5])
    //                     console.log('[+] a8: ', new StdString(args[6]).toString())
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 // if (arg.a3) {
    //                 //     console.log('[+] a3: ', new StdString(arg.a3).toString());
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }

    // {
    //     const funcName = 'night::NSASTParse::is_punctuation(std::string const&)'
    //     const targetAddr = baseAddr.resolveFunctionAddress(funcName)
    //     // ReadFile
    //     if (targetAddr != null) {
    //         let i = 0;
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
    //                     this.output = this.index >= 20906 && this.index <= 21000
    //                     if (!this.output) return
    //                     console.log(`${funcName}${this.index} - onEnter`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (!this.output) return
    //                 console.log('retval:', retval)
    //                 if (retval.toInt32() > 0) {
    //                     const no = new NSNode(retval).toJSON()
    //                     console.log('retval:', JSON.stringify(no, null, 4))
    //                 }
    //                 if (this.ecx) {
    //                     const _this = new NSASTParse(this.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 console.log(`${funcName}${this.index} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::is_obj_op_self(bool)'
    //     const targetAddr = baseAddr.resolveAddress('0x00410AFC')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', args[0])
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 // if (retval.toInt32() > 0) {
    //                 //     const d = [
    //                 //         retval.readPointer(),
    //                 //         retval.add(4).readPointer()
    //                 //     ]
    //                 //     console.log(' ', JSON.stringify(d, null, 4));
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::ast_obj_block(void)'
    //     const targetAddr = baseAddr.resolveAddress('0x0041812E')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', args[0])
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (retval.toInt32() > 0) {
    //                     const d = new NSNode(retval).toJSON()
    //                     console.log(' ', JSON.stringify(d, null, 4));
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::ignore_punc(std::string const&)'
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
    //                     this.output = this.index == 1943
    //                     if (!this.output) return
    //                     console.log(`${funcName} - onEnter`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (!this.output) return
    //                 console.log('retval:', retval)
    //                 if (this.ecx) {
    //                     const _this = new NSASTParse(this.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'night::NSASTParse::ast_obj_op_self(night::ns_node * a2)'
    //     const targetAddr = baseAddr.resolveAddress('0x00414188')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('[+] a2: ', JSON.stringify(new NSNode(args[0]).toJSON(), null, 4))
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     arg.ecx = ecx
    //                     // const _this = new NSASTParse(ecx).toJSON()
    //                     // console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 // if (arg.ecx) {
    //                 //     const _this = new NSASTParse(arg.ecx).toJSON()
    //                 //     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'night::NSASTParse::is_save_for_division(night::ns_node *a2)'
    //     const targetAddr = baseAddr.resolveAddress('0x0040F210')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     console.log('[+] a2: ', JSON.stringify(new NSNode(args[0]).toJSON(), null, 4))
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     arg.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (arg.ecx) {
    //                     const _this = new NSASTParse(arg.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }

    
    // {
    //     const funcName = 'night::NSASTParse::ast_function(void)'
    //     const targetAddr = baseAddr.resolveAddress('0x00417578')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {}
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
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     arg.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (retval.toInt32() > 0) {
    //                     const d = new NSNode(retval).toJSON()
    //                     console.log(' ', JSON.stringify(d, null, 4));
    //                 }
    //                 if (arg.ecx) {
    //                     const _this = new NSASTParse(arg.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'night::NSASTParse::ast_for(void)'
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
    //                     console.log(`${funcName} - onEnter`);
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     // console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        
    //                     const ctx = this.context as any as Record<string, NativePointer>
    //                     const ecx = ctx.ecx
    //                     this.ecx = ecx
    //                     const _this = new NSASTParse(ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                     // arg.a3 = args[2]
                        
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
    //                 if (retval.toInt32() > 0) {
    //                     const d = new NSNode(retval).toJSON()
    //                     console.log(' ', JSON.stringify(d, null, 4));
    //                 }
    //                 if (this.ecx) {
    //                     const _this = new NSASTParse(this.ecx).toJSON()
    //                     console.log('NSASTParse:', JSON.stringify(_this, null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
}