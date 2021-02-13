import React from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use-localstorage';
import SelectWidget from './Components/SelectWidget';

const Main = styled.main`
  margin-top: 50px;
  margin-left: 50px;
`;

function App() {
  const mockItems = Array(1000).fill().map((e, i) => `Item ${i + 1}`);
  const [selectedItems, setSelectedItems] = useLocalStorage('selectedItems', '[]');

  function storeSelectedItems(items) {
    setSelectedItems(JSON.stringify(items));
  }

  function getSelectedItems() {
    try {
      return selectedItems ? JSON.parse(selectedItems) : [];
    } catch {
      storeSelectedItems([]);
      return [];
    }
  }

  return (
    <Main>
      <SelectWidget
        items={mockItems}
        selected={getSelectedItems()}
        onChange={storeSelectedItems}
      />
    </Main>
  );
}

export default App;
