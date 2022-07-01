export default {
    base: '/docs/',
    lang: 'en-US',
    title: 'double-ui-vue',
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
        nav: [
            { text: '首页', link: '/' },
            { text: '组件', link: '/guide/breadcrumb' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '指引',
                    items: [
                        { text: '使用说明', link: '/guide/' }
                    ]
                },
                {
                    text: '组件',
                    items: [
                        { text: 'Breadcrumb', link: '/guide/breadcrumb' },
                        { text: 'Button', link: '/guide/button' },
                        { text: 'Checkbox', link: '/guide/checkbox' },
                        { text: 'Drawer', link: '/guide/drawer' },
                        { text: 'DropTrigger', link: '/guide/dropTrigger' },
                        { text: 'Dropdown', link: '/guide/dropdown' },
                        { text: 'Form', link: '/guide/form' },
                        { text: 'Input', link: '/guide/input' },
                        { text: 'Message', link: '/guide/message' },
                        { text: 'MiniLoading', link: '/guide/miniLoading' },
                        { text: 'PopoverTip', link: '/guide/popoverTip' },
                        { text: 'Select', link: '/guide/select' },
                        { text: 'SidebarCustom', link: '/guide/sidebarCustom' },
                        { text: 'Skeleton', link: '/guide/skeleton' },
                        { text: 'Table', link: '/guide/table' },
                        { text: 'TitleTip', link: '/guide/titleTip' },
                    ]
                }
            ],
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present Xiong Shuang'
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

