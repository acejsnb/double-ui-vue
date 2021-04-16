const fs = require('fs');
const { exec } = require('child_process');

// 修改文件名
const rename = (filePath) => {
    fs.readdir(filePath, (err, files) => {
        // files是名称数组
        files.forEach((filename) => {
            // 运用正则表达式替换oldPath中不想要的部分
            const oldPath = `${filePath}/${filename}`;

            exec(`stylus --css ${oldPath} ${filePath}/${filename.split('.')[0]}.styl`, (err, stdout, stderr) => {
                if (err) throw err;
                fs.unlink(oldPath, (error) => {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                    console.log(`${filename} 删除成功`);
                });
            });
        });
    });
};

rename('./custom/theme');
