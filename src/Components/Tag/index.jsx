import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const Item = styled.div`
  background-color: #dadada;
  padding-left: 16px;
`;

const Tag = ({ item, onDismiss }) => (
  <Item>
    <span>{item}</span>
    <Button
      type="text"
      icon={<CloseOutlined />}
      onClick={() => { onDismiss(item); }}
    />
  </Item>
);

Tag.propTypes = {
  item: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Tag;
