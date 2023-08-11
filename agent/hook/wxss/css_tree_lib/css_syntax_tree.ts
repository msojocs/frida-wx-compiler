import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../utils/addr.js";
import CSSSyntaxTree from "../class/css_syntax_tree.js";

export const hookCSSSyntaxTree = (baseAddr: BaseAddr) => {
    
    {
        const funcName = 'WXSS::CSSTreeLib::CSSSyntaxTree::RenderCode(std::string &,bool)'
        const targetAddr = baseAddr.resolveFunctionAddress(funcName)
        // ReadFile
        if (targetAddr != null) {
            let i = 0;
            const argument: Record<string, NativePointer> = {}
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
                        ++i
                        this.index = i
                        console.log(`${funcName} - onEnter${this.index}`);
                        console.log('[+] Called targetAddr:' + targetAddr);
                        // console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
                        console.log('[+] a2:', new StdString(args[0]).toString());
                        console.log('[+] a3:', args[1]);
                        const ctx = this.context as any as Record<string, NativePointer>
                        const ecx = ctx.ecx
                        this.ecx = ecx
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
                    if (this.ecx) {
                        const t = new CSSSyntaxTree(this.ecx).toJSON()
                        console.log('this:', JSON.stringify(t, null, 4))
                    }
                    console.log(`${funcName} - onLeave${this.index}\n\n`);
                }
            });
        }
    }
}