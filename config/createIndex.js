// 创建打包后的index.js
const fs = require('fs');
const { resolve } = require('path');

// 获取时间
const TimeFn = require('../get_time');
const {
    name, version, author, license
} = require('../package.json');
const banner = `/**
* @${name} v${version}
* (c) 2020-2021 ${author}
* Released under the ${license} License.
* ${TimeFn()}
*/
`;

// 写入index.js index.css
const readFile = (url) => {
    fs.readdir(resolve(__dirname, url), (err, data) => {
        const arr = data.filter(d => (!d.includes('.') && d !== 'base'));
        const resultJs = [], resultCss = ['@import "./base/style.css";'],
            resultJsDefault = [];
        arr.forEach(d => {
            resultJs.push(`import ${d} from './${d}';`);
            resultJsDefault.push(d);
            resultCss.push(`@import "./${d}/style.css";`)
        })
        const importObj = `\n${resultJs.join('\n')}\n`,
            exportObj = `\nexport { ${resultJsDefault.join(', ')} };`,
            exportDefault = `\nexport default { ${resultJsDefault.join(', ')} };\n`;
        fs.writeFile(resolve(__dirname, `${url}/index.js`), (banner + importObj + exportObj + exportDefault), err => {
            if (err) {
                console.log(`js写入出现错误 ${err.toString()}`);
            } else {
                console.log('js完成!');
            }
        });
        const resCss = `\n${resultCss.join('')}`;
        fs.writeFile(resolve(__dirname, `${url}/index.css`), (banner + resCss), err => {
            if (err) {
                console.log(`css写入出现错误 ${err.toString()}`);
            } else {
                console.log('css完成!');
            }
        });
    });
};
readFile('../lib');
