export default {
	type: 'Result',
	title: "结果页面",
	nested: false,
	props: {
        style: {},
        title: "支付失败",
        message: "所选银行卡余额不足",
	},
	needDiv: true,
	config: [
		{
			text: '文字内容',
			children:[
                {
                    type: 'string',
                    text: '标题内容',
                    field: 'title' // props.content
                },
                {
                    type: 'string',
                    text: '详细内容',
                    field: 'message' // props.content
                },
            ]
        }
	],
}