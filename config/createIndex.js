// 创建打包后的index.js
const fs = require('fs');
const { resolve } = require('path');

const path = resolve(__dirname, '../lib');
fs.readdir(path, (err, files) => {
    if (err) return;
    let importStr = '';
    let exportStr = '';
    let styleStr = '';
    const lastIndex = files.length - 1;
    files.forEach((name, i) => {
        importStr += `import ${name} from './${name}';\n`;
        exportStr += `${name}${i === lastIndex ? '' : ', '}`
        styleStr += `@import "./${name}/style.css";\n`
    })
    const str = importStr + `export { ${exportStr} }`;
    fs.writeFile(resolve(__dirname, '../lib/index.js'), str, (err) => {
        if (err) console.log('---写入js失败---');
        else console.log('===写入js成功===');
    })
    fs.writeFile(resolve(__dirname, '../lib/index.css'), styleStr, (err) => {
        if (err) console.log('---写入css失败---');
        else console.log('===写入css成功===');
    })
})
