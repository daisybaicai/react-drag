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
                        'dark', 'light'
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
                // {
                //     type: 'array',
                //     text: '左侧icon',
                //     field: 'icon',
                //     data: [
                //         'check-circle', 'check', 'check-circle-o',
                //         'cross-circle', 'cross', 'cross-circle-o',
                //         'up', 'down', 'left',
                //         'right', 'ellipsis',
                //         'loading', false
                //     ] 
                // }
            ]
        }
	],
}