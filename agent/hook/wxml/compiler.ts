import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse } from "../../cpp/std_vector.js";

export const hookCompiler = (baseAddr: BaseAddr) => {

    {
        const funcName = 'WXML::Compiler::CompileLazy'
        const targetAddr = baseAddr.resolveAddress('0x40A124')
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
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        
                        console.log('[+] Argv2: ' + args[2]);
                        console.log('[+] Argv3: ' + args[3]);
                        console.log('[+] Argv4: ' + args[4]);
                        console.log('[+] Argv5: ' + args[5]);
                        console.log('[+] Argv6: ' + stdVectorStringParse(args[6]));
                        console.log('[+] Argv7: ' + args[7]);
                        console.log('[+] Argv8: ', args[8]) // bool isLLA
                        console.log('[+] Argv9: ', new StdString(args[9]).toString()) // gwxMark
                        console.log('[+] Argv10: ' + args[10]);
                        console.log('[+] Argv11: ' + args[11]);
                        // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
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
}