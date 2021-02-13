import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import SelectModal from '../SelectModal';
import Tag from '../Tag';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #bebebe;
  border-radius: 8px;
  display: inline-block;
  min-width: 200px;
`;

const SelectWidget = ({ items, selected, onChange }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const modalItems = items.map((value) => ({
    value, selected: selected.includes(value),
  }));

  function removeItem(item) {
    const copy = [...selected];
    copy.splice(copy.findIndex((i) => i === item), 1);
    onChange(copy);
  }

  function showModal() {
    setIsModalShown(true);
  }

  function saveItems(updatedItems) {
    onChange(updatedItems);
    setIsModalShown(false);
  }

  function hideModal() {
    setIsModalShown(false);
  }

  return (
    <Wrapper>
      <Space direction="vertical">
        {selected.length
          ? (
            <>
              <div>Selected items:</div>
              <Space>
                {selected.map((item) => <Tag key={item} item={item} onDismiss={removeItem} />)}
              </Space>
            </>
          ) : (
            <div>No items selected</div>
          )}

        <Button type="primary" onClick={showModal}>
          {selected.length ? 'Change' : 'Select'}
        </Button>
      </Space>

      <SelectModal
        showModal={isModalShown}
        items={modalItems}
        onSave={saveItems}
        onCancel={hideModal}
      />
    </Wrapper>
  );
};

SelectWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectWidget;
