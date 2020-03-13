export default {
	type: "InputItem",
	title: "输入文本框",
	needDiv: true,
	nested: false,
	props: {
		content: '标题',
		// style: {
		//     margin: "0px 10px 0px 0px"
		// }
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