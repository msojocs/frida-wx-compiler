import BaseAddr from "../../../hook/utils/addr.js";
import { StdString } from "../../../cpp/std_string.js";
import ExprSyntaxTree from "./class/exper_syntax_tree.js";

export const hookExprSyntaxTree = (baseAddr: BaseAddr) => {

    {
        const funcName = 'WXML::EXPRLib::ExprSyntaxTree::RenderAsOps(std::stringstream &,std::string const&,bool &)'
        const targetAddr = baseAddr.resolveAddress('0x0042B518')
        // ReadFile
        if (targetAddr != null) {
            let i = 0
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
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        // console.log('[+] Argv0: ', args[0]);
                        console.log('[+] a3: ', new StdString(args[1]).toString());
                        console.log('[+] a4: ', args[2]);
                        arg.a3 = args[1]
                        arg.a4 = args[2]
                        const ctx = this.context as any
                        const ecx: NativePointer = ctx.ecx
                        console.log('ecx:', ecx)
                        i++
                        // if (i == 1)
                            console.log('data:', JSON.stringify(new ExprSyntaxTree(ecx).toJSON(), null, 4))
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
                    i--
                    if (i == 0) {
                        if (arg.a3) {
                            console.log('a3: ', new StdString(arg.a3).toString())
                        }
                        if (arg.a4) {
                            console.log('a4: ', arg.a4)
                        }
                    }
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    // {
    //     const funcName = 'std::deque<zcc::shared_ptr<WXML::EXPRLib::ExprSyntaxTree>>::push_back(zcc::shared_ptr<WXML::EXPRLib::ExprSyntaxTree> const&)'
    //     const targetAddr = baseAddr.resolveAddress('0x00501AE0')
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
    //                     // console.log('arg0:', readStdString(args[0]))
    //                     console.log('[+] Argv0: ', args[0]);
    //                     if (args[0].readPointer().toInt32() > 0)
    //                         console.log('arg0:', JSON.stringify(new ExprSyntaxTree(args[0].readPointer()).toJSON(), null, 4))

    //                     const ctx = this.context as any
    //                     const ecx: NativePointer = ctx.ecx
    //                     console.log('ecx:', ecx)
                        
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
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
}