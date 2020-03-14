export default {
    type: "Button",
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
                data: ['primary','ghost','warning']
            },{
                type: 'array',
                text: '大小',
                field: 'size',
                data: ['large','small']
            },{
                type: 'array',
                text: '是否禁用',
                field: 'disabled',
                data: ['true',false]
            },{
                type: 'array',
                text: '行内元素',
                field: 'inline',
                data: ['true',false]
            },{
                type: 'array',
                text: 'icon',
                field: 'icon',
                data: [
                    'check-circle', 'check', 'check-circle-o',
                    'cross-circle', 'cross', 'cross-circle-o',
                    'up', 'down', 'left',
                    'right', 'ellipsis',
                    'loading', false
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