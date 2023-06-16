import sys
import frida



# jscode = '''
# Java.perform(function() {
#     var CoolMarket = Java.use('com.coolapk.market.CoolMarketApplication');
#     CoolMarket.onLog.implementation = function() {
        
#         var deviceId = Java.use('com.coolapk.market.util.SystemUtils').getDeviceId(this);
#         console.log('Device Id: ', deviceId);

#         var app_token = Java.use('com.coolapk.market.util.AuthUtils').getAS(this, deviceId);
#         console.log('App Token: ', app_token);

#         console.log('----------');
#         return 1;
#     }
# })
# '''


jscodes = '''
Java.perform(function() {
    var load_pointer = Module.getExportByName('libnative-lib.so', 'JNI_OnLoad');
    var hook_pointer = '0x' + parseInt(parseInt(load_pointer) - parseInt('0x31A04') + parseInt('0x31DB8')).toString(16);
    var pointer = new NativePointer(hook_pointer);
    console.log('Hook Method Pointer: ', pointer);

    var b64_encode = new NativeFunction(pointer, 'pointer', ['uchar', 'uint']);

    Interceptor.attach(pointer, {
        onEnter: function(args) {
            console.log('===> method hooked.');
            console.log(Memory.readCString(args[0]));
            console.log(args[1].toInt32());
            console.log('---');
        },
        onLeave: function(retval) {
            console.log(Memory.readCString(retval));
        }
    });
})
'''

def on_message(message, data):
    print("[%s] => %s" % (message, data))

if __name__ == '__main__':
    jscode = open('_agent.js', 'r',encoding='utf-8').read()
    process = frida.attach('wcc-sleep.exe')
    script = process.create_script(jscode)
    script.on('message', on_message)
    print('[*] Running CTF')
    script.load()
    sys.stdin.read()
    # print('api.hello() =>', script.exports.hello())
    process.detach()