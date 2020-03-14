export default {
	type: 'Tag',
	title: "标签",
	nested: false,
	props: {
		content: 'tag',
		style: {}
	},
	needDiv: false,
	config: [
		{
			text: '文字内容',
			children:[{
				type: 'string',
				text: '内容',
				field: 'content' // props.content
			}]
		}
	],
}