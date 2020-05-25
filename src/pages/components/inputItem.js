export default {
	type: "InputItem",
	title: "输入文本框",
	src: "inputitem.png",
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
					{text: "银行卡类型", value: "bankCard"},
					{text: "普通输入", value: "string"},
					{text: "电话输入", value: "phone"},
					{text: "密码输入", value: "password"},
					{text: "number数值输入", value: "number"},
				]
			},{
                type: 'array',
                text: '是否禁用',
                field: 'disabled',
                data: [{
					text: '是',
					value: true
				},
				{
					text: '否',
					value: false
				}]
            },{
				type: 'array',
                text: '是否可清除',
                field: 'clear',
                data: [{
					text: '是',
					value: true
				},
				{
					text: '否',
					value: false
				}]
			}]
		}
	],
}