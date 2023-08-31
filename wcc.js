const { spawn, spawnSync, exec, execSync } = require("child_process");
const fs = require('fs');
(async () => {
    console.log('start')
    const wccTask = spawn('d:\\Work\\disassembly\\wcc-exec\\wcc\\wcc-sleep.exe', ["--config-path", "d:/Work/WeChatProjects/miniprogram-1/wcc/99a9bac3c05fc25dd070298212c4a7d3"], {
        cwd: 'd:/Work/WeChatProjects/miniprogram-1'
    })
    wccTask.stdout.on('data', (d) => {
        // console.log(d.toString())
    })
    const hookTask = spawn('python', ['-u', "d:\\Work\\disassembly\\hook\\wcc.py"])
    // const f = fs.openSync('output.log', 'w')
    hookTask.stdout.on('data', (d) => {
        console.log(d.toString())
        // fs.writeSync(f, d.toString())
    })
    // console.log('end')
    hookTask.on('exit', () => {
        // fs.closeSync(f)
    })
    wccTask.on('exit', () => {
        hookTask.stdin.write("\n");
    })
    // wccTask.on('error', (res) => {
    //     console.log(res)
    // })
    // execSync('python -u "d:/Work/disassembly/hook/wcc.py" > output.log')
    
    // console.log(wccTask.stderr.toString())
    // console.log(wccTask.stdout.toString())
    
})()