import StdMap from "../../../cpp/std_map.js";
import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";
import Base, { stdVectorSharedPtrBase } from "./class/base.js";
import BNF, { stdVectorBNF } from "./class/bnf.js";

export const hookBNF = (baseAddr: BaseAddr) => {
    let intMapecx: NativePointer
    {
        const funcName = 'std::map<int,std::map<std::string,std::vector<WXML::EXPRLib::BNF>>>::operator[](int &&)'
        const targetAddr = baseAddr.resolveAddress('0x00500998')
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        console.log('arg0:', args[0].readPointer())
                        const ctx = this.context as any
                        const ecx = ctx.ecx
                        arg.ecx = ecx
                        if (!intMapecx)
                            intMapecx = ecx

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
                    // if (arg.ecx) {
                    //     const result = new StdMap(arg.ecx, {
                    //         inspectElement: (ptr) => {
                    //             const keyPtr = ptr.add(16)
                    //             const valuePtr = keyPtr.add(4)
                    //             const d = {
                    //                 key: keyPtr.readU32(),
                    //                 value: new StdMap(valuePtr, {
                    //                     inspectElement: (ptr2) => {
                    //                         const keyPtr = ptr2.add(16)
                    //                         const valuePtr = keyPtr.add(24)
                    //                         const d2 = {
                    //                             key: new StdString(keyPtr).toString() || '',
                    //                             value: stdVectorBNF(valuePtr)
                    //                         }
                    //                         return d2
                    //                     }
                    //                 })
                    //             }
                    //             return d
                    //             // return ''
                    //         }
                    //     }).toJSON()
                    //     console.log('content:', JSON.stringify(result, null, 4))
                    // }
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'std::map<int,std::map<std::string,std::vector<WXML::EXPRLib::BNF>>>::operator[](int const&)'
        const targetAddr = baseAddr.resolveAddress('0x00500A78')
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        console.log('arg0:', args[0])
                        // console.log('[+] Argv0: ', args[0].readU32())
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
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'std::map<std::string,std::vector<WXML::EXPRLib::BNF>>::operator[](std::string&&)'
        const targetAddr = baseAddr.resolveAddress('0x00500298')
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        console.log('arg0:', args[0])
                        console.log('arg0:', new StdString(args[0]).toString())
                        // console.log('[+] Argv0: ', args[0].readUtf8String())
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
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'std::vector<WXML::EXPRLib::BNF>::push_back(WXML::EXPRLib::BNF const&)'
        const targetAddr = baseAddr.resolveAddress('0x00506898')
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        console.log('arg0:', args[0])
                        console.log('arg0:', JSON.stringify(new BNF(args[0]).toJSON(), null, 4))
                        const ctx = this.context as any
                        arg.ecx = ctx.ecx
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
                    if (arg.ecx)
                        console.log(JSON.stringify(stdVectorBNF(arg.ecx), null, 4))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    
    {
        const funcName = 'WXML::EXPRLib::TransitTable::Init(void)'
        const targetAddr = baseAddr.resolveAddress('0x0042F7BE')
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
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        // console.log('[+] Argv0: ', args[0].readUtf8String())
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
                    if (intMapecx) {
                        const result = new StdMap(intMapecx, {
                            inspectElement: (ptr) => {
                                const keyPtr = ptr.add(16)
                                const valuePtr = keyPtr.add(4)
                                const d = {
                                    key: keyPtr.readU32(),
                                    value: new StdMap(valuePtr, {
                                        inspectElement: (ptr2) => {
                                            const keyPtr = ptr2.add(16)
                                            const valuePtr = keyPtr.add(24)
                                            const d2 = {
                                                key: new StdString(keyPtr).toString() || '',
                                                value: stdVectorBNF(valuePtr)
                                            }
                                            return d2
                                        }
                                    })
                                }
                                return d
                                // return ''
                            }
                        }).toJSON()
                        console.log('content:', JSON.stringify(result, null, 4))
                    }
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}