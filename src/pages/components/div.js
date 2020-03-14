export default {
  type: 'div',
  title: 'div容器',
  nested: true,
  props: {
    style: {
      border: '1px solid black',
      height: '100px',
      width: '',
      marginTop: '',
    },
  },
  needDiv: false,
  children: [],
  config: [
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