const { join } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const open = require('opn');

const Koa = require('koa');
// const KoaRouter = require('-router');
const serve = require('koa-static');

const app = new Koa();

app.use(serve(join(__dirname, 'production')));

// 响应
app.use(async ctx => {
    // ctx.body = 'Hello Koa';
    await ctx.render('./index.html');
});

const port = 3550; // 端口号
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    open(`http://localhost:${port}`);
    console.log(`Listening at http://localhost:${port}\n`);
});
