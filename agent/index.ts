import { log } from "./logger.js"
import StdString from './cpp/std_string.js'
import StdVector from './cpp/std_vector.js'

(() => {
    const moduleName = 'wcc-sleep.exe'
    const baseAddr = Module.findBaseAddress(moduleName);
    

    function resolveAddress(addr: string) {
        if (baseAddr == null)
            throw new Error('baseAddr error!')
        var result;
        try {

            var idaBase = ptr('0x400000'); // Enter the base address of jvm.dll as seen in your favorite disassembler (here IDA)
            var offset = ptr(addr).sub(idaBase); // Calculate offset in memory from base address in IDA database
            result = baseAddr.add(offset); // Add current memory base address to offset of function to monitor
            console.log('[+] New addr=' + result); // Write location of function in memory to console
        } catch (error) {
            console.log(error)
        }
        return result;
    }

    {
        let fileContentPtr: NativePointer | null
        const targetAddr = resolveAddress('0x4017E0')
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
                        
                        console.log('ReadFile - onEnter');
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        fileContentPtr = args[1]
                        // console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
                        // console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
                        // const stdString = args[0]
                        // console.log(stdString.add(0 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(1 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(2 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(3 * Process.pointerSize).readPointer())
                        // console.log('[*] Intercepted printRef() with string length:', StdString.length(args[0]));
                        console.log('arg0:', args[0].readUtf8String())
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
                    console.log('prt:', fileContentPtr)
                }
            });
        }
    }
    {
        const targetAddr = resolveAddress('0x506D54')
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
                        
                        console.log('emplace_back - onEnter');
                        console.log('[+] Called targetAddr:' + targetAddr);
                        console.log('[+] Ctx: ' + args[-1]);
                        // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
                        // console.log('arg0:', readStdString(args[0]))
                        console.log('[+] Argv0: ', args[0])
                        console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
                        const ctx = this.context as any
                        console.log('vec pointer:', ctx.ecx)
                        if (ptr(ctx.ecx).readU32() > 0) {
                            // console.log('ptr:', ptr(ctx.ecx).toString(16))
                            // console.log('ptr:', ptr(ctx.ecx).readPointer())
                            // const str = new StdString(ptr(`0x${ptr(ctx.ecx).readU32().toString(16)}`))
                            // console.log(str.toString())
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
                        const str = new StdString(args[0])
                        console.log('arg1 length:', str.size.toInt32().toString(16))
                        console.log('arg1 data:', str.toString())
                        // console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
                        // console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
                        // const stdString = args[0]
                        // console.log(stdString.add(0 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(1 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(2 * Process.pointerSize).readPointer())
                        // console.log(stdString.add(3 * Process.pointerSize).readPointer())
                        // console.log('[*] Intercepted printRef() with string length:', StdString.length(args[0]));
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
})()