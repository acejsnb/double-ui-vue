// 检查字符是否包含html
const CheckHtml = (htmlStr) => (/<[^>]+>/g).test(htmlStr);

export default CheckHtml;
