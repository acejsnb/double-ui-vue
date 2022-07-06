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
                        { text: 'Breadcrumb 面包屑', link: '/guide/breadcrumb' },
                        { text: 'Button 按钮', link: '/guide/button' },
                        { text: 'Checkbox 多选框', link: '/guide/checkbox' },
                        { text: 'Drawer 侧拉窗', link: '/guide/drawer' },
                        { text: 'DropTrigger 触发器', link: '/guide/dropTrigger' },
                        { text: 'Dropdown 下拉列表', link: '/guide/dropdown' },
                        { text: 'Form 表单', link: '/guide/form' },
                        { text: 'Input 输入框', link: '/guide/input' },
                        { text: 'Message 信息提示', link: '/guide/message' },
                        { text: 'MiniLoading 加载', link: '/guide/miniLoading' },
                        { text: 'PopoverTip 气泡提示', link: '/guide/popoverTip' },
                        { text: 'Select 选择器', link: '/guide/select' },
                        { text: 'SidebarCustom 侧边栏', link: '/guide/sidebarCustom' },
                        { text: 'Skeleton 骨架屏', link: '/guide/skeleton' },
                        { text: 'Table 表格', link: '/guide/table' },
                        { text: 'TitleTip 自定义标签title', link: '/guide/titleTip' },
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

