import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";
import StrCache from "./class/str_cache.js";
import Token from "./class/token.js";

export const hookStrCache = (baseAddr: BaseAddr) => {
  
    {
        const funcName = 'WXML::DOMLib::StrCache::Insert(std::string)'
        const targetAddr = baseAddr.resolveAddress('0x00471B54')
        // ReadFile
        if (targetAddr != null) {
            let ecx: NativePointer
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
                        console.log('[+] Argv0: ', new StdString(args[0]).toString() || '')
                        const ctx = this.context as any
                        ecx = ctx.ecx
                        console.log('data:', JSON.stringify(new StrCache(ecx).toJSON(), null, 4))
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
                    if (ecx) {
                        console.log('data:', JSON.stringify(new StrCache(ecx).toJSON(), null, 4))
                    }
                    console.log('retval:', retval)
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'WXML::DOMLib::StrCache::RenderPathDefine(std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &)'
        const targetAddr = baseAddr.resolveAddress('0x00471AB8')
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
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        const ctx = this.context as any
                        const ecx = ctx.ecx
                        console.log('data:', JSON.stringify(new StrCache(ecx).toJSON(), null, 4))
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
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}