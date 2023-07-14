import type BaseAddr from "../utils/addr.js";
import { StdString } from '../../cpp/std_string.js'
import StdVector, { stdVectorStringParse } from "../../cpp/std_vector.js";
import StdMap, { stdMapString2IntParse, stdMapString2StringParse, stdMapString2VectorStringParse } from "../../cpp/std_map.js";
import WxmlDom from "./dom_lib/class/wxml_dom.js";

export const hookCompiler = (baseAddr: BaseAddr) => {

    {
        const funcName = 'WXML::Compiler::CompileLazy'
        const targetAddr = baseAddr.resolveAddress('0x40A124')
        // ReadFile
        if (targetAddr != null) {
            const argument: {
                outputMap?: NativePointer
                dict?: NativePointer
                arg4?: NativePointer
                arg7?: NativePointer
            } = {}
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
                        console.log('[+] fileContentMap: ', stdMapString2StringParse(args[0]))
                        console.log('[+] errorMessage: ', new StdString(args[1]).toString()); // This pointer will store the de/encrypted data
                        console.log('[+] Argv2: ' + args[2]);
                        argument.outputMap = args[2]
                        console.log('[+] Argv3: ' + args[3]);
                        argument.dict = args[3]
                        console.log('[+] Argv4: ' + args[4]);
                        argument.arg4 = args[4]
                        console.log(stdMapString2VectorStringParse(args[4]));
                        console.log('[+] Argv5: ' + args[5]);
                        console.log(stdMapString2VectorStringParse(args[5]));
                        console.log('[+] splitedData: ', stdVectorStringParse(args[6]));
                        console.log('[+] mapData1: ', stdMapString2StringParse(args[7]));
                        argument.arg7 = args[7]
                        console.log('[+] Argv8: ', args[8]) // bool isLLA
                        console.log('[+] Argv9: ', new StdString(args[9]).toString()) // gwxMark
                        console.log('[+] Argv10: ' + args[10]);
                        console.log('[+] Argv11: ' + args[11]);
                        console.log('[+] Argv12: ', args[12]);;
                        console.log('[+] Argv13: ', args[13]);;
                        console.log('[+] Argv14: ', args[14]);
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
                    if (argument.outputMap)
                        console.log('outputMap:', stdMapString2StringParse(argument.outputMap))
                    if (argument.dict)
                        console.log('dict:', stdMapString2StringParse(argument.dict))
                    if (argument.arg4)
                        console.log('arg4:', stdMapString2VectorStringParse(argument.arg4));
                    if (argument.arg7)
                        console.log('mapData1 arg7:', stdMapString2VectorStringParse(argument.arg7));
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'WXML::Compiler::ParseSource'
        const targetAddr = baseAddr.resolveAddress('0x405522')
        // ReadFile
        if (targetAddr != null) {
            const argument: {
                map1?: NativePointer
                map2?: NativePointer
                result?: NativePointer
            } = {

            }
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
                        console.log('[+] fileName: ', new StdString(args[0]).toString())
                        // console.log('[+] content: ', new StdString(args[1]).toString()); // This pointer will store the de/encrypted data
                        console.log('[+] Argv2: ' + args[2]);
                        console.log('[+] gwxMark: ', new StdString(args[3]).toString());
                        console.log('[+] fMark: ', new StdString(args[4]).toString());
                        console.log('[+] Argv5: ', stdMapString2StringParse(args[5]));
                        console.log('[+] Argv6: ', args[6]);
                        console.log('[+] Argv7 result: ', args[7]);
                        argument.result = args[7]
                        console.log('[+] Argv8 map1: ', stdMapString2StringParse(args[8]))
                        argument.map1 = args[8]
                        console.log('[+] Argv9 map2: ', stdMapString2IntParse(args[9]))
                        argument.map2 = args[9]
                        console.log('[+] Argv10: ', args[10])
                        console.log('[+] Argv11: ', args[11])
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
                    if (argument.map1)
                        console.log('map1:', stdMapString2StringParse(argument.map1))
                    if (argument.map2)
                        console.log('map2:', stdMapString2IntParse(argument.map2))
                    if (argument.result)
                        console.log('result:', JSON.stringify(new StdMap(argument.result, {
                            inspectElement: (ptr) => {
                                const keyPtr = ptr.add(16)
                                const valuePtr = keyPtr.add(24)
                                const result: Record<string, any> = {
                                    key: '',
                                    value: '',
                                }
                                if (keyPtr.readU32() > 0)
                                    result.key = new StdString(keyPtr).toString() || ''
                                if (valuePtr.readU32() > 0) {
                                    // result.value = new StdString(valuePtr).toString() || ''
                                    result.value = new WxmlDom(valuePtr.readPointer()).toJSON()
                                }
                                return result
                            }
                        }).toJSON(), null, 4))
                    // console.log('dict:', stdMapString2StringParse(argument.dict))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'WXML::Compiler::DealWxsTag(std::string const& 0, WXML::DOMLib::Token & 1, std::string& 2, std::string& 3, std::string& 4, int & 5, std::string& 6)'
        const targetAddr = baseAddr.resolveAddress('0x0040469D')
        // ReadFile
        if (targetAddr != null) {
            const argument: {
                map1?: NativePointer
                map2?: NativePointer
            } = {

            }
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
                        console.log('[+] Argv0: ', new StdString(args[0]).toString());
                        console.log('[+] Argv1: ', args[1]);
                        console.log('[+] Argv2: ', new StdString(args[2]).toString());
                        console.log('[+] Argv3: ', new StdString(args[3]).toString());
                        console.log('[+] Argv4: ', new StdString(args[4]).toString());
                        console.log('[+] Argv5: ', args[5]);
                        console.log('[+] Argv6: ', new StdString(args[6]).toString());
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
                    if (argument.map1)
                        console.log('map1:', stdMapString2StringParse(argument.map1))
                    if (argument.map2)
                        console.log('map2:', stdMapString2IntParse(argument.map2))
                    // console.log('dict:', stdMapString2StringParse(argument.dict))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const funcName = 'WXML::Compiler::GetFuncId(std::map<std::string,int> &,std::string const&)'
        const targetAddr = baseAddr.resolveAddress('0x00404390')
        // ReadFile
        if (targetAddr != null) {
            const argument: {
                map1?: NativePointer
            } = {

            }
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
                        console.log('[+] Argv0: ', args[0]);
                        console.log('[+] Argv1: ', args[1]);
                        console.log('Argv1:', new StdString(args[1]).toString())
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
                    console.log('Argv1:', new StdString(retval).toString())
                    // console.log('dict:', stdMapString2StringParse(argument.dict))
                    console.log(`${funcName} - onLeave\n\n`);
                }
            });
        }
    }
}