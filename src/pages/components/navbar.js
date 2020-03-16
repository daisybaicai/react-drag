export default {
	type: 'NavBar',
	title: "导航栏",
	nested: false,
	props: {
		content: '导航栏',
        style: {},
        mode: 'dark'
	},
	needDiv: false,
	config: [
		{
			text: '文字内容',
			children:[
                {
                    type: 'string',
                    text: '内容',
                    field: 'content' // props.content
                },
                {
                    type: 'array',
                    text: '主题颜色',
                    field: 'mode',
                    data: [
                        {
                            text: '深色',
                            value: 'dark'
                        },
                        {
                            text: '亮色',
                            value: 'light',
                        }
                    ]
                },
                {
                    type: 'string',
                    text: '左侧内容',
                    field: 'leftContent' // props.content
                },
                {
                    type: 'string',
                    text: '右侧内容',
                    field: 'rightContent' // props.content
                },
            ]
        }
	],
}