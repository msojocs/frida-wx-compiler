import { log } from "./logger.js"
import { StdString } from './cpp/std_string.js'
import StdMap from './cpp/std_map.js'
import { hookWcc } from './wcc/index.js'
import BaseAddr from "./utils/addr.js"
import { hookWXML } from './wxml/index.js'

(() => {
    const moduleName = 'wcc-sleep.exe'
    const _baseAddr = Module.findBaseAddress(moduleName);
    if (_baseAddr == null)
        throw new Error('baseAddr error!')
    const baseAddr = new BaseAddr(_baseAddr)
    
    // hookWcc(baseAddr)
    // hookWXML(baseAddr)

    // {
    //     // std::vector<std::string>::emplace_back<std::string>
    //     const targetAddr = baseAddr.resolveAddress('0x506D54')
    //     // emplace_back
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
                        
    //                     console.log('emplace_back - onEnter');
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('arg0:', readStdString(args[0]))
    //                     console.log('[+] Argv0: ', args[0])
    //                     console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
    //                     const ctx = this.context as any
    //                     console.log('vec pointer:', ctx.ecx)
    //                     if (ptr(ctx.ecx).readU32() > 0) {
    //                         const vec = new StdVector(ptr(`0x${ptr(ctx.ecx).toString(16)}`), {
    //                             introspectElement: (p) => {
    //                                 // console.log('introspectElement:', p)
    //                                 return new StdString(p).toString() || 'empty'
    //                             },
    //                             elementSize: 24
    //                         })
    //                         console.log('vec data:')
    //                         console.log(vec.toString())
    //                     }
    //                     else {
    //                         console.log('skip null')
    //                     }
    //                 } catch (error) {
    //                     console.log('error:', error)
    //                 }
    //                 console.log('\n\n')
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
    //     // std::vector<std::string>::push_back(_DWORD *this, int a2)
    //     const targetAddr = baseAddr.resolveAddress('0x5070B0')
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
                        
    //                     console.log('push_back - onEnter');
    //                     console.log('[+] Called targetAddr:' + targetAddr);
    //                     console.log('[+] Ctx: ' + args[-1]);
    //                     // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //                     // console.log('arg0:', readStdString(args[0]))
    //                     console.log('[+] Argv0: ', args[0])
    //                     console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
    //                     const ctx = this.context as any
    //                     console.log('vec pointer:', ctx.ecx)
    //                     if (ptr(ctx.ecx).readU32() > 0) {
    //                         const vec = new StdVector(ctx.ecx, {
    //                             introspectElement: (p) => {
    //                                 // console.log('introspectElement:', p)
    //                                 return new StdString(p).toString() || 'empty'
    //                             },
    //                             elementSize: 24
    //                         })
    //                         console.log('vec data:')
    //                         console.log(vec.toString())
    //                     }
    //                     else {
    //                         console.log('skip null')
    //                     }
    //                 } catch (error) {
    //                     console.log('error:', error)
    //                 }
    //                 console.log('\n\n')
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
    {
        // std::map<std::string,std::string>::operator[](char *this, int a2)
        const targetAddr = baseAddr.resolveAddress('0x500114')
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
                        
                        console.log('std::map<std::string,std::string>::operator[] - onEnter');
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('arg0:', new StdString(args[0]).toString())
                        const ctx = this.context as any
                        console.log('ecx pointer:', ctx.ecx)
                        const stdMap = new StdMap(ctx.ecx)
                        console.log('size:', stdMap.size)
                        console.log('data:', stdMap.toString())
                    } catch (error) {
                        console.log('error:', error)
                    }
                    console.log('\n\n')
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
                }
            });
        }
    }
})()