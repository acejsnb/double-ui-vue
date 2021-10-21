// 检查字符是否包含html
const CheckHtml = (htmlStr: string) => /<[^>]+>/g.test(htmlStr);

export default CheckHtml;
