
import BaseAddr from "../../utils/addr.js";
import { StdString } from '../../../cpp/std_string.js'
import StdVector from "../../../cpp/std_vector.js";

export const hookString = (baseAddr: BaseAddr) => {

    {
        const target = 'std::vector<std::string>::emplace_back<std::string>'
        const targetAddr = baseAddr.resolveAddress('0x506D54')
        // emplace_back
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
                        
                        console.log(`${target} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        const ctx = this.context as any
                        console.log('vec pointer:', ctx.ecx)
                        if (ptr(ctx.ecx).readU32() > 0) {
                            const vec = new StdVector(ptr(`0x${ptr(ctx.ecx).toString(16)}`), {
                                introspectElement: (p) => {
                                    // console.log('introspectElement:', p)
                                    return new StdString(p).toString() || 'empty'
                                },
                                elementSize: 24
                            })
                            console.log('vec data:')
                            console.log(vec.toString())
                        }
                        else {
                            console.log('skip null')
                        }
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
                    console.log(`${target} - onLeave`);
                }
            });
        }
    }
    {
        const target = 'std::vector<std::string>::push_back(_DWORD *this, int a2)'
        const targetAddr = baseAddr.resolveAddress('0x5070B0')
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
                        
                        console.log(`${target} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        const ctx = this.context as any
                        console.log('vec pointer:', ctx.ecx)
                        if (ptr(ctx.ecx).readU32() > 0) {
                            const vec = new StdVector(ctx.ecx, {
                                introspectElement: (p) => {
                                    // console.log('introspectElement:', p)
                                    return new StdString(p).toString() || 'empty'
                                },
                                elementSize: 24
                            })
                            console.log('vec data:')
                            console.log(vec.toString())
                        }
                        else {
                            console.log('skip null')
                        }
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
                    console.log(`${target} - onLeave`);
                }
            });
        }
    }
   
}