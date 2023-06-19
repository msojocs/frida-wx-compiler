import { stdMapString2StringParse } from "../../../cpp/std_map.js";
import { StdString } from "../../../cpp/std_string.js";
import BaseAddr from "../../../hook/utils/addr.js";

export const hookInsert = (baseAddr: BaseAddr) => {
    {
        const target = '<string,string>_M_get_insert_hint_unique_pos'
        const targetAddr = baseAddr.resolveAddress('0x523564')
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
                        // console.log(stdMapString2StringParse(args[0]))
                        console.log('[+] Argv1: ', args[1]); // This pointer will store the de/encrypted data
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
                    console.log('retval:', retval)
                    console.log(`${target} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const target = '<std::string,shared_ptr<std::basic_stringstream>>::_M_get_insert_hint_unique_pos(std::_Rb_tree_const_iterator<std::pair<std::string const,zcc::shared_ptr<std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>>>>>,std::string const&)'
        const targetAddr = baseAddr.resolveAddress('0x523904')
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
                        // console.log(stdMapString2StringParse(args[0]))
                        console.log('[+] Argv1: ', args[1]); // This pointer will store the de/encrypted data
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
                    console.log('retval:', retval)
                    console.log(`${target} - onLeave\n\n`);
                }
            });
        }
    }
    {
        const target = '<std::string,std::pair<std::string const,zcc::shared_ptr<std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>>>>,::_M_insert_node(std::_Rb_tree_node_base *,std::_Rb_tree_node_base *,std::_Rb_tree_node<std::pair<std::string const,zcc::shared_ptr<std::basic_stringstream<char,std::char_traits<char>,std::allocator<char>>>>> *)'
        const targetAddr = baseAddr.resolveAddress('0x523828')
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
                        // console.log(stdMapString2StringParse(args[0]))
                        console.log('[+] Argv1: ', args[1]); // This pointer will store the de/encrypted data
                        // console.log('Argv1:', new StdString(args[1]).toString())
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
                    console.log(`${target} - onLeave\n\n`);
                }
            });
        }
    }
}