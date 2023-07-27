import { stdVectorStringParse } from "../../../cpp/std_vector.js";
import StdMap, { stdMapString2StringParse } from "../../../cpp/std_map.js";
import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";
import { stdMapString2RVMOpCodePosition } from "./class/rvm_op_code_position.js";
import WxmlDom from "./class/wxml_dom.js";

export const hookWxmlDom = (baseAddr: BaseAddr) => {
    
    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::DealSingleTokenToOps(std::string const&,std::string&,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &,std::map<std::string,WXML::DOMLib::RVMOpCodePosition> &,WXML::DOMLib::Token *,bool,int,bool,WXML::DOMLib::RVMOpCodePositionRecorder *,bool,std::map const&<std::string,std::string,std::less<std::string>,std::allocator<std::pair<std::string const,std::string>>>)'
    //     const targetAddr = baseAddr.resolveAddress('0x004229B2')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: any = {

    //         }
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
    //                     console.log('[+] a1: ', new StdString(args[0]).toString())
    //                     console.log('[+] a2: ', new StdString(args[1]).toString());
    //                     console.log('[+] a6: ', args[5]);
    //                     console.log('[+] a7: ', args[6]);
    //                     console.log('[+] a8: ', args[7]);
    //                     console.log('[+] a10: ', args[9]);
    //                     console.log('[+] a11: ', args[10]);
    //                     // const ctx = this.context as any
    //                     // console.log('ecx:', ctx.ecx)
    //                     // arg.arg10 = args[10]
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
                    
    //                 */
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 console.log('[+] Return: ' + retval);
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::RenderNonDefine(std::string const&,std::string const&,std::string&,std::string const&,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &,WXML::NameAllocator *,std::string const&,std::string const&,std::string const&,std::string const&,char,bool,uint,std::map<std::string,std::string> *)'
    //     const targetAddr = baseAddr.resolveAddress('0x00423D86')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: any = {

    //         }
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
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     console.log('[+] a3: ', new StdString(args[1]).toString());
    //                     console.log('[+] a4: ', new StdString(args[2]).toString());
    //                     console.log('[+] a5: ', new StdString(args[3]).toString());
    //                     console.log('[+] a8: ', new StdString(args[6]).toString());
    //                     console.log('[+] a9: ', new StdString(args[7]).toString());
    //                     console.log('[+] a10: ', new StdString(args[8]).toString());
    //                     console.log('[+] a11: ', new StdString(args[9]).toString());
    //                     console.log('[+] a12: ', args[10]);
    //                     console.log('[+] a13: ', args[11]);
    //                     console.log('[+] a14: ', args[12]);
    //                     // arg.arg10 = args[10]
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
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::RenderMeAsFunction(std::string const&,std::string const&,std::string&,std::string const&,std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>> &,WXML::NameAllocator *,std::string const&,std::string const&,std::string const&,std::string const&,std::string const&,char,std::string const&,bool,bool,uint,std::string const&)'
    //     const targetAddr = baseAddr.resolveAddress('0x00429976')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: any = {

    //         }
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
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     console.log('[+] a3: ', new StdString(args[1]).toString());
    //                     console.log('[+] a4: ', new StdString(args[2]).toString());
    //                     console.log('[+] a5: ', new StdString(args[3]).toString());
    //                     console.log('[+] a8: ', new StdString(args[6]).toString());
    //                     console.log('[+] a9: ', new StdString(args[7]).toString());
    //                     console.log('[+] a10: ', new StdString(args[8]).toString());
    //                     console.log('[+] a11: ', new StdString(args[9]).toString());
    //                     console.log('[+] a12: ', new StdString(args[10]).toString());
    //                     console.log('[+] a13: ', args[11]);
    //                     console.log('[+] a14: ', new StdString(args[12]).toString());
    //                     // arg.arg10 = args[10]
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
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::RenderAllOpsAndRecord(std::string const& a2, std::string& a3,std::stringstream & a4,std::map<std::string,WXML::DOMLib::RVMOpCodePosition> & a5, WXML::DOMLib::RVMOpCodePositionRecorder * a6, bool a7, std::map const<std::string,std::string> &a8)'
    //     const targetAddr = baseAddr.resolveAddress('0x00423B6C')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {

    //         }
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
    //                     console.log('[+] a2: ', new StdString(args[0]).toString())
    //                     console.log('[+] a3: ', new StdString(args[1]).toString());
    //                     console.log('[+] a4: ', args[2]);
    //                     console.log('[+] a5: ', args[3]);
    //                     console.log('[+] a6: ', args[4]);
    //                     console.log('[+] a7: ', args[5]);
    //                     console.log('[+] a8: ', args[6]);
    //                     console.log('a5 parse:', JSON.stringify(stdMapString2RVMOpCodePosition(args[3]), null, 4))
    //                     console.log('a6:', args[4].readInt(), args[4].add(4).readInt())
    //                     console.log('a8 parse:', stdMapString2StringParse(args[6].readPointer()))
    //                     const ctx = this.context as any
    //                     console.log('wxml data:', JSON.stringify(new WxmlDom(ctx.ecx).toJSON(), null, 4))
    //                     // arg.arg10 = args[10]
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
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }

    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::RewriteTree(void)'
    //     const targetAddr = baseAddr.resolveAddress('0x0042060C')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: Record<string, NativePointer> = {

    //         }
    //         let i = 0;
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
    //                     const ctx = this.context as any
    //                     console.log('ecx:', ctx.ecx)
    //                     console.log('i ---> ', i)
    //                     if (i++ == 0) {
    //                         arg.ecx = ctx.ecx
    //                     }
    //                     // arg.arg10 = args[10]
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
    //                 i--
    //                 console.log('i ---> ', i)
    //                 if (arg.ecx && i == 0) {
    //                     const ecx = arg.ecx
    //                     console.log('wxml data:', JSON.stringify(new WxmlDom(ecx).toJSON(), null, 4))
    //                 }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
    
    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::CutDomsForCustomComponent(std::vector<std::string> const& a2)'
    //     const targetAddr = baseAddr.resolveAddress('0x0047109C')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: any = {

    //         }
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
    //                     console.log('[+] a2: ', stdVectorStringParse(args[0]))
    //                     // arg.arg10 = args[10]
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
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }

    // {
    //     const funcName = 'WXML::DOMLib::WXMLDom::RecordAllPath(void)'
    //     const targetAddr = baseAddr.resolveAddress('0x0042270E')
    //     // ReadFile
    //     if (targetAddr != null) {
    //         const arg: any = {

    //         }
    //         let i = 0
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
    //                     const ctx = this.context as any
    //                     const ecx = ctx.ecx
    //                     i++
    //                     if (i == 1) {
    //                         const wxmlDom = new WxmlDom(ecx).toJSON()
    //                         console.log('dom:', JSON.stringify(wxmlDom, null, 4))
    //                     }

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
    //                 // if (arg.arg10) {
    //                 //     console.log('[+] Argv10: ', stdMapString2StringParse(arg.arg10));
    //                 // }
    //                 i--
    //                 console.log(`${funcName} - onLeave\n\n`);
    //             }
    //         });
    //     }
    // }
}