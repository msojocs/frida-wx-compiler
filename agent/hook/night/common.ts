import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse } from "../../cpp/std_vector.js";
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2VectorStringParse } from "../../cpp/std_map.js";

export const hookCommon = (baseAddr: BaseAddr) => {
    
    {
        const funcName = 'night::compile_ns(std::string const&,std::string const&,std::string const&,uint,std::string&,bool)'
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
                        i++
                        this.index = i
                        console.log(`${funcName}${this.index} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] a1: ', new StdString(args[0]).toString())
                        // console.log('[+] a2: ', new StdString(args[1]).toString());
                        // console.log('[+] a3: ', new StdString(args[2]).toString());
                        // arg.a3 = args[2]
                        this.a5 = args[4]
                        
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
                    if (this.a5) {
                        console.log('[+] a5: ', new StdString(this.a5).toString());
                    }
                    console.log(`${funcName}${this.index} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'night::compile_ns_no_wrapper(std::string const&,std::string const&,uint,std::string&,bool)'
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
                        i++
                        this.index = i
                        console.log(`${funcName}${this.index} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] a1: ', new StdString(args[0]).toString())
                        console.log('[+] a2: ', new StdString(args[1]).toString())
                        console.log('[+] a3: ', args[2])
                        console.log('[+] a4: ', new StdString(args[3]).toString())
                        console.log('[+] a5: ', args[4])
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
                    console.log('retval:', retval)
                    if (this.a4) {
                        console.log('[+] a4: ', new StdString(this.a4).toString());
                    }
                    console.log(`${funcName}${this.index} - onLeave\n\n`);
                }
            });
        }
    }
}