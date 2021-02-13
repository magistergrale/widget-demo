import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Checkbox, Input, Select, Space,
} from 'antd';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import Tag from '../Tag';
import { stringIncludes } from '../../utils';
import { filterOptions } from './utils';

const ModalBody = styled.div`
  margin: -24px;
`;

const ToolBar = styled.div`
  display: flex;
  padding: 16px 24px;
  border-bottom: 1px solid #dadada;
`;

const CheckboxList = styled.div`
  margin-left: 24px;
  height: 30vh;
`;

const SelectedList = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #dadada;
`;

const SelectModal = ({
  showModal, items: initItems, maxSelected = 3, onSave, onCancel,
}) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(filterOptions[0].value);

  const selectedItems = useMemo(() => items
    .filter((i) => i.selected).map((i) => i.value), [items]);

  const displayedItems = useMemo(() => items
    .filter((item, index) => (
      index > filter && (!searchTerm || stringIncludes(item.value, searchTerm))
    )), [items, filter, searchTerm]);

  function removeItem(value) {
    const copy = [...items];
    copy.find((i) => i.value === value).selected = false;
    setItems(copy);
  }

  function toggleItemSelection(item, isChecked) {
    const copy = [...items];
    copy.find((i) => i.value === item.value).selected = isChecked;
    setItems(copy);
  }

  function resetSearchAndFilter() {
    setSearchTerm('');
    setFilter(filterOptions[0].value);
  }

  function save() {
    resetSearchAndFilter();
    onSave(selectedItems);
  }

  function cancel() {
    resetSearchAndFilter();
    onCancel();
  }

  useEffect(() => { setItems(initItems); }, initItems);

  return (
    <Modal title="Select Items" visible={showModal} okText="Save" onOk={save} onCancel={cancel}>
      <ModalBody>
        <ToolBar>
          <Input
            style={{ marginRight: '4px', width: '75%' }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); }}
          />
          <Select value={filter} onChange={setFilter} style={{ marginLeft: '4px', width: '25%' }}>
            {filterOptions.map(({ value, text }) => (
              <Select.Option key={value} value={value}>{text}</Select.Option>
            ))}
          </Select>
        </ToolBar>
        <CheckboxList>
          <AutoSizer>
            {({ width, height }) => (
              <List width={width} height={height} itemSize={22} itemCount={displayedItems.length}>
                {({ index, style }) => (
                  <div style={style}>
                    <Checkbox
                      checked={displayedItems[index].selected}
                      disabled={
                        selectedItems.length >= maxSelected
                        && !displayedItems[index].selected
                      }
                      onChange={(e) => {
                        toggleItemSelection(displayedItems[index], e.target.checked);
                      }}
                    >
                      {displayedItems[index].value}
                    </Checkbox>
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        </CheckboxList>
        {selectedItems.length > 0 && (
          <SelectedList>
            <div>Selected items:</div>
            <Space>
              {selectedItems.map((item) => <Tag key={item} item={item} onDismiss={removeItem} />)}
            </Space>
          </SelectedList>
        )}
      </ModalBody>
    </Modal>
  );
};

SelectModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  maxSelected: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

SelectModal.defaultProps = {
  maxSelected: 3,
};

export default SelectModal;
