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
};

const renderComponent = (data) =>  {
  return data.map(item => {
    return (
      <div data-id={item.type} key={_.uniqueId()}>
        <Tag>{item.title}</Tag>
      </div>
    );
  });
}

export default function ComponentList() {
    return (
      <Sortable options={sortOptions}>
        {renderComponent(componentList)}
      </Sortable> 
    )
}