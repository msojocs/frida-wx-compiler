const { spawn, spawnSync, exec, execSync } = require("child_process");
const fs = require('fs');
(async () => {
    console.log('start')
    const wccTask = spawn('d:\\Work\\disassembly\\wcc-exec\\wcc\\wcc-sleep.exe', ["--wxs", "D:/Work/disassembly/wcc-exec/wcc/config/sample3.json"], {
        cwd: 'd:/Work/WeChatProjects/issue/97/ThorUI-applets-vip'
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