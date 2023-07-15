const { spawn, spawnSync, exec, execSync } = require("child_process");
(async () => {
    console.log('start')
    const wccTask = spawnSync('d:\\Work\\disassembly\\wcc-exec\\wcc\\wcc-sleep.exe', ["--config-path", "d:/Work/disassembly/wcc-exec/wcc/cmd1.txt"], {
        cwd: '/mnt/d/Work/WeChatProjects/miniprogram-demo/miniprogram'
    })
    console.log('end')
    // wccTask.on('error', (res) => {
    //     console.log(res)
    // })
    // execSync('python -u "d:/Work/disassembly/hook/wcc.py" > output.log')
    
    // console.log(wccTask.stderr.toString())
    // console.log(wccTask.stdout.toString())
    
})()