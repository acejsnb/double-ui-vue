export default {
    base: '/docs/',
    lang: 'en-US',
    title: 'components',
    description: 'vue3组件库文档',
    // 打包目录
    dest: './dist',
    // 头部head
    head: [
        // 添加图标
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        algolia: {
            appId: 'R2IYF7ETH7',
            apiKey: '599cec31baffa4868cae4e79f180729b',
            indexName: 'docsearch',
            searchParameters: {
                facetFilters: ['tags:guide,api']
            }
        },
        sidebar: {
            '/': [
                {
                    text:'HTML',
                    children: [
                        { text: '基础', link: '/HTML/' },
                        { text: '进阶', link: '/HTML/advanced' },
                    ],
                    sidebarDepth:3
                },
                {
                    text:'CSS',
                    children:[
                        { text: '基础', link: '/CSS/' },
                        { text: '进阶', link: '/CSS/advanced' },
                    ]
                },
                {
                    text:'Javascript',
                    children:[
                        { text: '基础', link: '/Javascript/' },
                        { text: '进阶', link: '/Javascript/advanced' },
                        { text: '进阶', link: '/Javascript/nightmare' },
                    ]
                },
                {
                    text:'Vue',
                    children:[
                        { text: '基础', link: '/Vue/' },
                        { text: '进阶', link: '/Vue/advanced' },
                    ]
                },
                {
                    text:'浏览器',
                    children:[
                        { text: '基础', link: '/Vue/' },
                        { text: '进阶', link: '/Vue/advanced' },
                    ]
                },
                {
                    text:'网络',
                    children:[
                        { text: '基础', link: '/Network/' },
                        { text: '进阶', link: '/Network/advanced' },
                    ]
                },
                {
                    text:'安全',
                    children:[
                        { text: '基础', link: '/Security/' },
                        { text: '进阶', link: '/Security/advanced' },
                    ]
                },
                {
                    text:'面经',
                    children:[
                        { text: '基础', link: '/Experience/' },
                        { text: '进阶', link: '/Experience/advanced' },
                    ]
                },
            ]
        }
    },
    // 使用插件
    plugins: [
        '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
        '@vuepress/back-to-top',          // 返回顶部插件
        '@vuepress/medium-zoom',          // 图片预览插件
        '@vuepress/nprogress',        //页面顶部进度条
    ]
}
