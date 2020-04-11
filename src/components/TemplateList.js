import React, { useState, useEffect } from 'react';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
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
    return data.map(item => {
      return (
        <>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#595959' }} key={_.uniqueId()}>
            {item.com_name}
          </div>
          <span data-id={`com-${item.com_name}`} key={_.uniqueId()} className="item" style={{ border: '1px dashed #b9b9b9', marginBottom: '4px', cursor: 'move', padding: '4px', display: 'inline-block'}}>
            <img src={item.file_path} width="200px"/>
          </span>
        </>
      );
    });
  };

  return (
    <>
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
