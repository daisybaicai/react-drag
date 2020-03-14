export default {
	type: "InputItem",
	title: "输入文本框",
	needDiv: true,
	nested: false,
	props: {
		content: '标题',
	},
	config: [
		{
			text: '文字内容',
			children:[{
				type: 'string',
				text: '内容',
				field: 'content' // props.content
			},{
				type: 'string',
				text: '用户提示',
				field: 'placeholder'
			},{
				type: 'array',
				text: '输入类型',
				field: 'type',
				data: [
					'bankCard',
					'string',
					'phone',
					'password',
					'number',
				]
			},{
                type: 'array',
                text: '是否禁用',
                field: 'disabled',
                data: ['true',false]
            },{
				type: 'array',
                text: '是否可清除',
                field: 'clear',
                data: ['true',false]
			}]
		}
	],
}