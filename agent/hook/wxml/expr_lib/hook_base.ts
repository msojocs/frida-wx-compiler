import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";
import Base, { stdVectorSharedPtrBase } from "./class/base.js";

export const hookBase = (baseAddr: BaseAddr) => {
  
    {
        const funcName = 'std::vector<zcc::shared_ptr<WXML::EXPRLib::Base>>::push_back(zcc::shared_ptr<WXML::EXPRLib::Base> const&)'
        const targetAddr = baseAddr.resolveAddress('0x005060D8')
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
                        console.log('arg0:', JSON.stringify(new Base(args[0].readPointer()).toJSON(), null, 4))
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
}