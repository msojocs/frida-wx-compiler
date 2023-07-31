import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse } from "../../cpp/std_vector.js";
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2VectorStringParse } from "../../cpp/std_map.js";
import NSNode from "./class/ns_node.js";
import PeekData from "./class/peek_data.js";
import NSGod from "./class/ns_god.js";

export const hookNSGod = (baseAddr: BaseAddr) => {
    
    {
        const funcName = 'night::NSGod::gen_girl(std::string)'
        const targetAddr = baseAddr.resolveAddress('0x0040FDB8')
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
                        console.log('[+] a2:', new StdString(args[0]).toString())
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        arg.ecx = ecx
                        const instance = new NSGod(ecx).toJSON()
                        console.log('instance:', JSON.stringify(instance, null, 4))
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
                    console.log('retval:', retval)
                    if (arg.ecx) {
                        const instance = new NSGod(arg.ecx).toJSON()
                        console.log('instance:', JSON.stringify(instance, null, 4))
                    }
                    const ret = new StdVector(retval, {
                        elementSize: 4,
                        introspectElement: (ptr0) => {
                            return 'todo...'
                        }
                    }).toJSON()
                    console.log('content:', JSON.stringify(ret, null, 4))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    
    {
        const funcName = 'night::NSGod::gen_son(std::string)'
        const targetAddr = baseAddr.resolveAddress('0x0040F72A')
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
                        console.log('[+] a2:', new StdString(args[0]).toString())
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        arg.ecx = ecx
                        const instance = new NSGod(ecx).toJSON()
                        console.log('instance:', JSON.stringify(instance, null, 4))
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
                    console.log('retval:', retval)
                    if (arg.ecx) {
                        const instance = new NSGod(arg.ecx).toJSON()
                        console.log('instance:', JSON.stringify(instance, null, 4))
                    }
                    const ret = new NSNode(retval).toJSON()
                    console.log('content:', JSON.stringify(ret, null, 4))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}