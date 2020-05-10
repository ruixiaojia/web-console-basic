import {
    HomeOutlined,
    ToolOutlined,
} from '@ant-design/icons';

export default [
    {
        icon: HomeOutlined,
        name: "首页",
        path: "/home",
    },
    {
        icon: ToolOutlined,
        name: "常用工具",
        sub: [
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