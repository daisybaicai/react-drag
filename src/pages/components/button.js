export default {
    type: "Button",
    src: "button.png",
    title: "按钮",
    props: {
        type: 'primary',
        content: '按钮一只',
        style: {
            height: '',
            width: '',
            marginTop: '',
        },
    },
	config: [
        {
            text: '主题',
            children: [{
                type: 'array',
                text: '主题',
                field: 'type',
                data: [
                    {
                        text: '普通primary',
                        value: 'primary',
                    },
                    {
                        text: '透明',
                        value: 'ghost',
                    },
                    {
                        text: '警告色红色',
                        value: 'warning', 
                    }
                ]
            },{
                type: 'array',
                text: '大小',
                field: 'size',
                data: [
                    {
                        text: '大尺寸',
                        value: 'large'
                    },
                    {
                        text: '小尺寸',
                        value: 'small'
                    }
                ]
            },{
                type: 'array',
                text: '是否禁用',
                field: 'disabled',
                data: [
                    {
                        text: '是',
                        value: 'true'
                    },
                    {
                        text: '否',
                        value: false
                    }
                ]
            },{
                type: 'array',
                text: '行内元素',
                field: 'inline',
                data: [
                    {
                        text: '是',
                        value: 'true'
                    },
                    {
                        text: '否',
                        value: false
                    }
                ]
            },{
                type: 'array',
                text: 'icon',
                field: 'icon',
                data: [
                    {text: "check-circle", value: "check-circle"},
                    {text: "check", value: "check"},
                    {text: "check-circle-o", value: "check-circle-o"},
                    {text: "cross-circle", value: "cross-circle"},
                    {text: "cross", value: "cross"},
                    {text: "cross-circle-o", value: "cross-circle-o"},
                    {text: "up", value: "up"},
                    {text: "down", value: "down"},
                    {text: "left", value: "left"},
                    {text: "right", value: "right"},
                    {text: "ellipsis", value: "ellipsis"},
                    {text: "loading", value: "loading"},
                    {text: '无', value: false}
                ]
            }]
        },
        {
            text: '文字内容',
            children:[{
                type: 'string',
                text: '内容',
                field: 'content' // props.content
            }]
        },
        {
            text: '样式',
            key: 'style',
                  children:[{
                      type: 'string',
                      text: '宽度',
                      field: 'style.width' // props.content
            },
            {
                      type: 'string',
                      text: '高度',
                      field: 'style.height' // props.content
            },
            {
                      type: 'string',
                      text: '上边距',
                      field: 'style.marginTop' // props.content
            }]
          }
    ],
}