import { stdMapString2StringParse } from "../../../cpp/std_map.js";
import BaseAddr from "../../utils/addr.js";
import { StdString } from '../../../cpp/std_string.js'

export const hookString2String = (baseAddr: BaseAddr) => {
    {
        const target = 'std::map<std::string,std::string>::operator[](char *this, int a2)'
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
                        
                        console.log(`${target} - onEnter`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('arg0:', new StdString(args[0]).toString())
                        const ctx = this.context as any
                        console.log('ecx pointer:', ctx.ecx)
                        console.log(stdMapString2StringParse(ctx.ecx))
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