export default {
    type: "Button",
    title: "按钮",
    props: {
        type: 'dashed',
        content: '按钮一只',
        style: {
            margin: "0px 10px 0px 0px"
        }
    },
    config: {
        type: {
            text: "主题",
            enum: [
                'primary',
                'default',
                'dashed',
                'danger'
            ]
        },
        content: {
            text: '文案',
        },
    },
}