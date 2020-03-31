import React, { useState, useEffect } from 'react';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import { Tag, Button } from 'antd-mobile';
import { connect } from 'dva';

const sortableOption = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: {
    name: 'formItem',
    pull: 'clone',
    put: true,
  },
};

const TemplateList = props => {
  const [list, setList] = useState([]);
  const { templateList } = props;

  useEffect(() => {
    setList(templateList);
  }, [props.templateList]);

  const renderComponent = data => {
    console.log('data', data);
    return data.map(item => {
      return (
        <div key={_.uniqueId()} data-id={`com-${item.com_name}`}>
          <Tag>{item.com_name}</Tag>
        </div>
      );
    });
  };

  return (
    <>
      --
      {
        <Sortable
          options={{
            ...sortableOption,
          }}
          key={_.uniqueId()}
        >
          {renderComponent(templateList)}
        </Sortable>
      }
    </>
  );
};

export default connect(({ drag }) => ({
  templateList: drag.templateList,
}))(TemplateList);
