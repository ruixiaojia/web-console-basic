import {
    HomeOutlined,
    ToolOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export default [
    {
        icon: HomeOutlined,
        name: "首页",
        path: "/home",
    },
    {
        icon: SettingOutlined,
        name: "设置",
        sub: [
            {
                name: "登录页设置",
                path: "/settings/loginpage-setting",
            },
            {
                name: "添加新用户",
                path: "/settings/new-user",
            }
        ],
    },
    {
        icon: ToolOutlined,
        name: "常用工具",
        sub: [
            {
                name: "静态资源上传",
                path: "/tools/upload",
            },
            {
                name: "翻译格式转换",
                path: "/tools/translation",
            },
            {
                name: "埋点格式转换",
                path: "/tools/buried-point",
            }
        ],
    },
];