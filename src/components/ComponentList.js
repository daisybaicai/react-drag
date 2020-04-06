import React from 'react';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import { Tag } from 'antd-mobile';
import componentList from '../pages/config';

const sortOptions = {
  group: {
    name: 'formItem',
    pull: 'clone',
    put: false,
  },
  sort: false,
  draggable: '.item',
};

const renderComponent = data => {
  return data.map(item => {
    const img = require(`../assets/components/${item.src}`);
    return (
      <>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#595959' }} key={_.uniqueId()}>
          {item.title}
        </div>
        <span data-id={item.type} key={_.uniqueId()} className="item" style={{ border: '1px dashed #b9b9b9', marginBottom: '4px', cursor: 'move', padding: '4px', display: 'inline-block'}}>
          <img src={img} width="200px"/>
        </span>
      </>
    );
  });
};

export default function ComponentList() {
  return (
    <Sortable options={sortOptions}>{renderComponent(componentList)}</Sortable>
  );
}
