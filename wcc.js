console.log("========Hook Start==========")

String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
}

console.log('prepare')
var moduleName = 'wcc-sleep.exe'
console.log('moduleName:', moduleName)
var baseAddr = Module.findBaseAddress(moduleName);
console.log('base:', baseAddr)
console.log('Module func list:', Object.keys(Module.prototype))

//字节数组转十六进制字符串，对负值填坑
function Bytes2HexString(arrBytes) {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
        var tmp;
        var num = arrBytes[i];
        if (num < 0) {
            //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
            tmp = (255 + num + 1).toString(16);
        } else {
            tmp = num.toString(16);
        }
        if (tmp.length == 1) {
            tmp = "0" + tmp;
        }
        str += tmp;
    }
    return str;
}
function buf2hex(buffer, split = ' ') { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join(split);
}
function jsonParse(t) {

    t = t.replace(/\\/g, '\\\\').replace(/       /g, '\\t').replace(/"/g, '\\"').replace(/\t/g, '\\t').replace(/\n/g, '\\n')
    console.log(t)
}
try {

    function dumpAddr(info, addr, size) {
        if (addr.isNull())
            return;

        console.log('Data dump ' + info + ' :');
        var buf = addr.readByteArray(size);

        // If you want color magic, set ansi to true
        console.log(hexdump(buf, { offset: -1, length: size, header: true, ansi: false }));
    }

    function resolveAddress(addr) {
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
    // function stringToHex(str) {
    //     var val = "";
    //     for (var i = 0; i < str.length; i++) {

    //         if (val == "")
    //             val = str.charCodeAt(i).toString(16);
    //         else
    //             val += " " + str.charCodeAt(i).toString(16);
    //     }
    //     return val;
    // }
    // 字符串转16进制
    function stringToHex(str) {
        if (str === "") {
            return "";
        }
        var arr = [];
        arr.push("0x");
        for (var i = 0; i < str.length; i++) {
            arr.push(' ' + str.charCodeAt(i).toString(16).padStart(2, '0'));
        }
        return arr.join('');
    }
    function getPointer(addr) {

        var hookpointer = '0x' + parseInt(baseAddr + parseInt('0x' + addr)).toString(16) // 获取要hook方法的地址
        return ptr(hookpointer) // 根据方法地址构建NativePointer
    }
    const StdString = {
        readData: (str) => {
            // console.log('read std::string at:', str)
            // console.log('Process.pointerSize:', Process.pointerSize)
            // console.log('mark:', str.add(6 * Process.pointerSize).readU8().toString(16))
            const isTiny = (str.add(6 * Process.pointerSize).readU8() & 0xF0) === 0;
            // console.log('isTiny:', isTiny)
            if (isTiny) {
              return str.add(1 * Process.pointerSize).readUtf8String();
            }
            return str.add(1 * Process.pointerSize).readPointer().readUtf8String();
        },
        length: (str) => {
            return str.add(5 * Process.pointerSize).readU32();
        }
    }

    // ReadFile
    {
        let fileContentPtr
        const targetAddr = resolveAddress('0x4017E0')
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
               console.log('ptr:', fileContentPtr)
               console.log('data:', StdString.length(fileContentPtr.readPointer()))
               console.log('ReadFile - onLeave\n\n');
            }
        });
    }
    // int __thiscall std::vector<std::string>::emplace_back<std::string>(int *this, int a2)
    {
        let fileContentPtr
        const targetAddr = resolveAddress('0x506D54')
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
                    fileContentPtr = args[1]
                    // console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
                    // console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
                    // const stdString = args[0]
                    // console.log(stdString.add(0 * Process.pointerSize).readPointer())
                    // console.log(stdString.add(1 * Process.pointerSize).readPointer())
                    // console.log(stdString.add(2 * Process.pointerSize).readPointer())
                    // console.log(stdString.add(3 * Process.pointerSize).readPointer())
                    // console.log('[*] Intercepted printRef() with string length:', StdString.length(args[0]));
                    console.log('arg1:', StdString.length(args[1]))
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
               console.log('prt:', fileContentPtr)
               console.log('data:', StdString.length(fileContentPtr.readPointer()))
            }
        });
    }

    // printRaw
    // Interceptor.attach(resolveAddress('0x2040'), { // Intercept calls to our SetAesDecrypt function

    //     // When function is called, print out its parameters
    //     /*
    //     以下内容演示了
    //     1. 怎么提取 printf 的第一个参数的字符串
    //     2. 怎么结合 onLever 做进入函数的时候获取 该函数要操作的内存和长度 ，等函数工作完毕，提取该数据
    //     其他API 用法
    //     https://frida.re/docs/javascript-api/
    //     */
    //     onEnter: function (args) {
    //         try {
                
    //             console.log('printRaw - onEnter');
    //             console.log('[+] Called monitorFuncAddr' + monitorFuncAddr);
    //             console.log('[+] Ctx: ' + args[-1]);
    //             // console.log('arg0:', readStdString(args[0]))
    //             console.log('[+] Argv0: ', args[0])
    //             // console.log('test read:', readStdString(ptr('0x00f7fcf0')))
    //             console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
    //             console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
    //             console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
    //             // const stdString = args[0]
    //             // console.log(stdString.add(0 * Process.pointerSize).readPointer())
    //             // console.log(stdString.add(1 * Process.pointerSize).readPointer())
    //             // console.log(stdString.add(2 * Process.pointerSize).readPointer())
    //             // console.log(stdString.add(3 * Process.pointerSize).readPointer())
    //             console.log('[*] Intercepted printRaw() with string length:', StdString.length(args[0].readPointer()));
    //             console.log('arg0:', StdString.readData(args[0].readPointer()))
    //             // console.log('arg0:', args[0].readPointer().add(4).readUtf8String())
    //         } catch (error) {
    //             console.log('error:', error)
    //         }
    //         
    //         /*
    //         dumpAddr('Input', args[0], args[3].toInt32());
    //         this.outptr = args[1]; // Store arg2 and arg3 in order to see when we leave the function
    //         this.outsize = args[2].toInt32();
    //         */
    //     },

    //     // When function is finished
    //     onLeave: function (retval) {
    //         /*
    //         dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
    //         console.log('[+] Returned from SomeFunc: ' + retval);
    //         */
    //     }
    // });
    // print2
    // Interceptor.attach(resolveAddress('0xc490'), { // Intercept calls to our SetAesDecrypt function

    //     // When function is called, print out its parameters
    //     /*
    //     以下内容演示了
    //     1. 怎么提取 printf 的第一个参数的字符串
    //     2. 怎么结合 onLever 做进入函数的时候获取 该函数要操作的内存和长度 ，等函数工作完毕，提取该数据
    //     其他API 用法
    //     https://frida.re/docs/javascript-api/
    //     */
    //     onEnter: function (args) {
    //         try {
                
    //             console.log('onEnter2');
    //             console.log('[+] Called monitorFuncAddr' + monitorFuncAddr);
    //             console.log('[+] Ctx: ' + args[-1]);
    //             // console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //             console.log('arg0:', Memory.readAnsiString(args[0]))
    //             // console.log('arg1:', Memory.readAnsiString(args[1]))
    //             console.log('[+] Argv0: ' + args[0]);
    //             console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
    //             console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
    //             console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
    //             // console.log('data:', readStdString(args[2]))
    //         } catch (error) {
    //             console.log('error:', error)
    //         }
    //         
    //         /*
    //         dumpAddr('Input', args[0], args[3].toInt32());
    //         this.outptr = args[1]; // Store arg2 and arg3 in order to see when we leave the function
    //         this.outsize = args[2].toInt32();
    //         */
    //     },

    //     // When function is finished
    //     onLeave: function (retval) {
    //         /*
    //         dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
    //         console.log('[+] Returned from SomeFunc: ' + retval);
    //         */
    //     }
    // });
    // Interceptor.attach(resolveAddress('0x0A68'), { // Intercept calls to our SetAesDecrypt function

    //     // When function is called, print out its parameters
    //     /*
    //     以下内容演示了
    //     1. 怎么提取 printf 的第一个参数的字符串
    //     2. 怎么结合 onLever 做进入函数的时候获取 该函数要操作的内存和长度 ，等函数工作完毕，提取该数据
    //     其他API 用法
    //     https://frida.re/docs/javascript-api/
    //     */
    //     onEnter: function (args) {
    //         console.log('');
    //         console.log('[+] Called monitorFuncAddr' + monitorFuncAddr);
    //         console.log('[+] Ctx: ' + args[-1]);
    //         console.log('[+] FormatString: ' + Memory.readAnsiString(args[0])); // Plaintext
    //         console.log('[+] Argv1: ' + args[1]); // This pointer will store the de/encrypted data
    //         console.log('[+] Argv2: ' + args[2]); // Length of data to en/decrypt
    //         console.log('[+] Argv3: ' + args[3]); // Length of data to en/decrypt
    //         /*
    //         dumpAddr('Input', args[0], args[3].toInt32());
    //         this.outptr = args[1]; // Store arg2 and arg3 in order to see when we leave the function
    //         this.outsize = args[2].toInt32();
    //         */
    //     },

    //     // When function is finished
    //     onLeave: function (retval) {
    //         /*
    //         dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
    //         console.log('[+] Returned from SomeFunc: ' + retval);
    //         */
    //     }
    // });
    // Java.perform(function() {
    //     var hookpointer = '0x' + parseInt(baseAddr + parseInt('0x0856')).toString(16) // 获取要hook方法的地址
    //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    //     console.log('[MD5Update] hook pointer: ', pointer)
    //     var t
    //     var arg0, arg1, arg2, arg3
    //     Interceptor.attach(pointer, {
    //             onEnter: function(args) {
    //                 arg0 = args[0]
    //                 t = arg1 = args[1]
    //                 arg2 = args[2]
    //                 console.log('\n')
    //                 console.log('=====> [MD5Update] -> [方法调用前]')
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    //                 console.log('\n')
    //             },
    //             onLeave: function(retval) {
    //                 console.log('\n')
    //                 console.log('=====> [MD5Update] -> [方法调用后]:')
    //                 console.log('返回值: ', retval)
    //                 console.log('参数t: {0} => {1}'.format(t, Memory.readCString(t)))
    //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('\n')
    //             }
    //         }   
    //     )
    // })
    // Java.perform(function() {
    //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x318C')).toString(16) // 获取要hook方法的地址
    //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    //     console.log('[printHex] hook pointer: ', pointer)
    //     var arg0, arg1, arg2, arg3
    //     Interceptor.attach(pointer, {
    //             onEnter: function(args) {
    //                 arg0 = args[0]
    //                 arg1 = args[1]
    //                 arg2 = args[2]
    //                 console.log('\n')
    //                 console.log('=====> [printHex] -> [方法调用前]')
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(30))))
    //                 console.log('参数2: {0} => {1}'.format(arg1, arg1.toInt32()))
    //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    //                 console.log('\n')
    //             },
    //             onLeave: function(retval) {
    //                 console.log('\n')
    //                 console.log('=====> [printHex] -> [方法调用后]:')
    //                 console.log('返回值: ', retval)
    //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    //                 console.log('参数1: {0} => {1}'.format(arg1, Memory.readCString(arg0)))
    //                 console.log('参数2: {0} => {1}'.format(arg1, arg1.toInt32()))
    //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    //                 console.log('\n')
    //             }
    //         }   
    //     )
    // })
    // Java.perform(function() {
    //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x3378')).toString(16) // 获取要hook方法的地址
    //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    //     console.log('[ka] hook pointer: ', pointer)
    //     var arg0, arg1, arg2, arg3
    //     Interceptor.attach(pointer, {
    //             onEnter: function(args) {
    //                 arg0 = args[0]
    //                 arg1 = args[1]
    //                 arg2 = args[2]
    //                 console.log('\n')
    //                 console.log('=====> [ka] -> [方法调用前]')
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 jsonParse(Memory.readCString(arg0))
    //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    //                 console.log('\n')
    //             },
    //             onLeave: function(retval) {
    //                 console.log('\n')
    //                 console.log('=====> [ka] -> [方法调用后]:')
    //                 console.log('返回值: ', retval)
    //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    //                 console.log('参数2: {0} => {1}'.format(arg0, Memory.readCString(arg1)))
    //                 console.log('\n')
    //             }
    //         }   
    //     )
    // })
    // Java.perform(function() {
    //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x3868')).toString(16) // 获取要hook方法的地址
    //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    //     console.log('[kq] hook pointer: ', pointer)
    //     var arg0, arg1, arg2, arg3
    //     Interceptor.attach(pointer, {
    //             onEnter: function(args) {
    //                 arg0 = args[0]
    //                 arg1 = args[1]
    //                 arg2 = args[2]
    //                 console.log('\n')
    //                 console.log('=====> [kq] -> [方法调用前]')
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('\n')
    //             },
    //             onLeave: function(retval) {
    //                 console.log('\n')
    //                 console.log('=====> [kq] -> [方法调用后]:')
    //                 console.log('返回值: ', retval)
    //                 console.log('参数1: {0} => {1}'.format(arg1, Memory.readCString(arg0)))
    //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    //                 console.log('\n')
    //             }
    //         }   
    //     )
    // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x3F48')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[is] hook pointer: ', pointer)
    // //     var t
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 t = arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [is] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [is] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('参数t: {0} => {1}'.format(t, Memory.readCString(t)))
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })

    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x40AC')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[a] hook pointer: ', pointer)
    // //     var t
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 t = arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [a] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [a] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('参数t: {0} => {1}'.format(t, Memory.readCString(t)))
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x41E4')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[tmc] hook pointer: ', pointer)

    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [tmc] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    // //                 console.log('参数4: {0} => {1}'.format(arg3, Memory.readCString(arg3)))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [tmc] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 // console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 // console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('\n')
    // //                 const musicInfo = getPointer('429C')
    // //                 console.log(musicInfo.readCString())
    // //             }
    // //         }   
    // //     )
    // // })
    // // bx
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x4F28')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[bx] hook pointer: ', pointer)
    // //     var t
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 t = arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [bx] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [bx] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('参数t: {0} => {1}'.format(t, Memory.readCString(t)))
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x5344')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[loadStateArray] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [loadStateArray] -> [方法调用前]')
    // //                 console.log('参数1: {0} => 0x{1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, stringToHex(Memory.readCString(arg1))))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [loadStateArray] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => 0x{1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x53C8')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[storeStateArray] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [storeStateArray] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16), '')))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, arg1.readCString()))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [storeStateArray] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, buf2hex(arg1.readByteArray(16))))
    // //                 console.log('返回: {0} => {1}'.format(retval, retval.readInt()))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x544C')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[keyExpansion] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [keyExpansion] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, arg0.readCString()))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, arg1.toUInt32()))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, buf2hex(arg2.readByteArray(360))))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [keyExpansion] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, arg0.readCString()))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, arg1.toUInt32()))
    // //                 console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    // //                 const byteArr = arg2.readByteArray(360)
    // //                 console.log('length:', byteArr.byteLength)
    // //                 console.log('参数3 - hex: {0} => {1}'.format(arg2, buf2hex(arg2.readByteArray(360))))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x5708')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[addRoundKey] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3, flag = true
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 if(flag){
    // //                     console.log('\n')
    // //                     console.log('=====> [addRoundKey] -> [方法调用前]')
    // //                     console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16), '')))
    // //                     console.log('参数2: {0} => {1}'.format(arg1, buf2hex(arg1.readByteArray(360), '')))
    // //                     console.log('\n')
    // //                 }
    // //             },
    // //             onLeave: function(retval) {
    // //                 if(flag){
    // //                     flag = false
    // //                     console.log('\n')
    // //                     console.log('=====> [addRoundKey] -> [方法调用后]:')
    // //                     console.log('返回值: ', retval)
    // //                     console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                     console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                     console.log('参数2: {0} => {1}'.format(arg1, buf2hex(arg1.readByteArray(360))))
    // //                     console.log('\n')
    // //                 }
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x580C')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[subBytes] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [subBytes] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16), '')))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [subBytes] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x593C')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[shiftRows] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 console.log('\n')
    // //                 console.log('=====> [shiftRows] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16), '')))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 console.log('\n')
    // //                 console.log('=====> [shiftRows] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x5BBC')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[GMul] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3, flag = true
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 if(!flag)return
    // //                 console.log('\n')
    // //                 console.log('=====> [GMul] -> [方法调用前]')
    // //                 console.log('参数1: {0} => {1}'.format(arg0, arg0))
    // //                 console.log('参数2: {0} => {1}'.format(arg1, arg1))
    // //                 console.log('\n')
    // //             },
    // //             onLeave: function(retval) {
    // //                 // if(!flag){
    // //                 //     return
    // //                 // }
    // //                 // flag = false
    // //                 console.log('\n')
    // //                 console.log('=====> [GMul] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, retval.readInt()))
    // //                 // console.log('参数1: {0} => {1}'.format(arg0, arg0))
    // //                 // console.log('参数2: {0} => {1}'.format(arg1, arg1))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // // Java.perform(function() {
    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x5C50')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('[mixColumns] hook pointer: ', pointer)
    // //     var arg0, arg1, arg2, arg3, flag=true
    // //     Interceptor.attach(pointer, {
    // //             onEnter: function(args) {
    // //                 arg0 = args[0]
    // //                 arg1 = args[1]
    // //                 arg2 = args[2]
    // //                 if(flag){
    // //                     console.log('\n')
    // //                     console.log('=====> [mixColumns] -> [方法调用前]')
    // //                     console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16), '')))
    // //                     console.log('\n')
    // //                 }
    // //             },
    // //             onLeave: function(retval) {
    // //                 // if(!flag){
    // //                 //     return
    // //                 // }
    // //                 // flag = false
    // //                 console.log('\n')
    // //                 console.log('=====> [mixColumns] -> [方法调用后]:')
    // //                 console.log('返回值: ', retval)
    // //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    // //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    // //                 console.log('\n')
    // //             }
    // //         }   
    // //     )
    // // })
    // Java.perform(function() {
    //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x6068')).toString(16) // 获取要hook方法的地址
    //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    //     console.log('[ae] hook pointer: ', pointer)
    //     var arg0, arg1, arg2, arg3, arg4
    //     Interceptor.attach(pointer, {
    //             onEnter: function(args) {
    //                 // constStr
    //                 arg0 = args[0]
    //                 // constStr_len
    //                 arg1 = args[1]
    //                 // jsonStr_copy
    //                 arg2 = args[2]
    //                 // jsonStr
    //                 arg3 = args[3]
    //                 // jsonStr_len
    //                 arg4 = args[4]
    //                 console.log('\n')
    //                 console.log('=====> [ae] -> [方法调用前]')
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('参数1: {0} => {1}'.format(arg0, buf2hex(arg0.readByteArray(16))))
    //                 console.log('参数2: {0} => {1}'.format(arg1, arg1))
    //                 console.log('参数3: {0} => {1}'.format(arg2, buf2hex(arg2.readByteArray(arg4.toInt32()))))
    //                 let t = Memory.readCString(arg3)
    //                 t = t.replace(/\\/g, '\\\\').replace(/       /g, '\\t').replace(/"/g, '\\"').replace(/\t/g, '\\t').replace(/\n/g, '\\n')
    //                 console.log('参数4: {0} => {1}'.format(arg3, String.raw`${t}`))
    //                 console.log('参数4: {0} => {1}'.format(arg3, buf2hex(arg3.readByteArray(arg4.toInt32()))))
    //                 console.log('参数5: {0} => {1}'.format(arg4, arg4))
    //                 console.log('\n')
    //             },
    //             onLeave: function(retval) {
    //                 console.log('\n')
    //                 console.log('=====> [ae] -> [方法调用后]:')
    //                 console.log('返回值: ', retval)
    //                 console.log('返回: {0} => {1}'.format(retval, Memory.readCString(retval)))
    //                 console.log('参数1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
    //                 console.log('参数2: {0} => {1}'.format(arg1, arg1))
    //                 let t = Memory.readCString(arg2)
    //                 t = t.replace(/\\/g, '\\\\').replace(/       /g, '\\t').replace(/"/g, '\\"').replace(/\t/g, '\\t').replace(/\n/g, '\\n')
    //                 console.log('参数3: {0} => {1}'.format(arg2, String.raw`${t}`))
    //                 // console.log('参数3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
    //                 // 发生变更
    //                 console.log('参数4: {0} => {1}'.format(arg3, buf2hex(arg3.readByteArray(arg4.toInt32()))))
    //                 console.log('参数5: {0} => {1}'.format(arg4, arg4))
    //                 console.log('\n')
    //             }
    //         }   
    //     )
    // })

    // // setInterval(() => {

    // //     var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x010009')).toString(16) // 获取要hook方法的地址
    // //     var pointer = new NativePointer(hookpointer) // 根据方法地址构建NativePointer
    // //     console.log('test hook pointer: ', buf2hex(pointer.readByteArray(256)))
    // // }, 1000);

} catch (error) {
    console.log('global error:', error)
}