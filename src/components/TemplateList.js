import React, { useState, useEffect } from 'react';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import { Tag, Button } from 'antd-mobile';
import { connect } from 'dva';

const sortOptions = {
  group: {
    name: 'formItem',
    pull: 'clone',
    put: true,
  },
  sort: false,
};

const TemplateList = props => {
  const [list, setList] = useState([]);
  const { templateList } = props;

  useEffect(() => {
    console.log('useeffect');
    setList(templateList);
    console.log('list', templateList, list);
  });

  const renderComponent = data => {
    console.log('data', data);
    return data.map(item => {
      return (
        <div key={_.uniqueId()}>
          <Tag>{item.name}</Tag>
        </div>
      );
    });
  };

  const renderComponent2 = data => {
    console.log('render2data', data);
    return <Sortable options={sortOptions}>{renderComponent(data)}</Sortable>;
  };

  const [state, setState] = useState([
    { id: 1, name: 'shrek' },
    { id: 2, name: 'fiona' },
  ]);

  const clickthings = () => {
    console.log('...', state);
    let arr1 = state;
    arr1.push({
      id: parseInt(Math.random() * 1000),
      name: 'dd' + Math.random(),
    });
    setState(arr1);
  };

  return (
    <>
      <Button onClick={clickthings}>33</Button>
      {/* <Sortable options={sortOptions}>{renderComponent(list)}</Sortable> */}
      --
      {renderComponent(list)}
      __
      {renderComponent2(list)}
      __
      {/* <Sortable>
        {state.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </Sortable> */}
    </>
  );
};

export default connect(({ drag }) => ({
  templateList: drag.templateList,
}))(TemplateList);
