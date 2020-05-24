export default {
	type: 'Result',
	title: "结果页面",
    nested: false,
    src: "result.png",
	props: {
        style: {},
        title: "支付失败",
        message: "所选银行卡余额不足"
    },
    nodeProps: {
        img: {
            renderFunc: "({icon, color}) => {return {antd: true,componentName: `Icon`, props: {type: icon,style: {fill: color},className: `spe`,size: `lg`}}}",
            renderString: "<Icon type=`%icon%` className=`spe` size=`lg` style={{ fill: `%color%` }} />",
            params: {
                icon: 'check-circle',
                color: '#1F90E6',
            }
        },
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
    reactNodeConfig: [
        {
			text: '图标样式',
			children:[
                {
                    type: 'color',
                    text: '颜色',
                    field: 'img.color' // props.color
                },
                {
                    type: 'array',
                    text: 'icon',
                    field: 'img.icon', // props.icon
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
                    ]
                },
            ]
        }
    ]
}