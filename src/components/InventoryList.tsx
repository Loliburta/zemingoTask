import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInventoryStore from "../store/useInventoryState";
import { Title } from "../commonStyles";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TopInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  row-gap: 10px;
  padding: 0px 10px;
`;

const AddNameInput = styled.input`
  display: flex;
  width: clamp(100px, 80vw, 200px);
  padding: 0px 10px;
  font-size: medium;
  height: 35px;
  background-color: #17171a;
  border: 1px solid white;
  border-radius: 3px;
  color: #e9ecf0;
`;

const AddQuantity = styled.div`
  display: flex;
  height: 35px;
  column-gap: 20px;
`;

const AddQuantityInput = styled.input`
  display: flex;
  max-width: 50px;
  text-align: center;
  font-size: medium;
  background-color: #17171a;
  border: 1px solid white;
  border-radius: 3px;
  color: #e9ecf0;
`;

const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: x-large;
  width: 35px;
  color: white;
  background-color: #0f9d0f;
  border: 1px solid #0f9d0f;
  border-radius: 3px;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 300px) {
    padding: clamp(0px, 1vw, 20px);
  }
`;

const ItemListContainer = styled.div`
  position: relative;
  margin: 20px 0px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  border-radius: 3px;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: large;
  cursor: pointer;
  color: #f40000;
  &:hover {
    color: #e60303;
  }
`;

const ItemList = styled.div`
  margin-top: 20px;
  flex-grow: 1;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  column-gap: 10px;
`;

const CreateNewProductButton = styled.button`
  width: clamp(100px, 80vw, 300px);
  margin: 0 auto;
  text-align: center;
  border-radius: 3px;
  text-decoration: none;
  border: 1px solid purple;
  background-color: #840e84;
  color: #e9ecf0;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
`;

const MinusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f00;
  color: white;
  font-size: 20px;
  border-radius: 3px;
  font-size: xx-large;
  width: 30px;
  height: 20px;
  line-height: 0;
  padding-bottom: 7px;
  cursor: pointer;
  &:hover {
    background-color: #d00;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  margin: 0px;
`;

const Quantity = styled.span`
  width: 50px;
  text-align: center;
  cursor: pointer;
`;

const Name = styled.span`
  flex: 1;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: #0056b3;
  }
`;

export const InventoryList: React.FC = () => {
  const {
    items,
    products,
    hasChanges,
    fetchInventory,
    fetchProducts,
    addItem,
    removeItem,
    updateItemQuantity,
    saveInventory,
    resetInventoryState,
  } = useInventoryStore();
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempQuantity, setTempQuantity] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, [fetchInventory, fetchProducts]);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleAddItem = () => {
    const newItem = { name: newItemName, quantity: newItemQuantity };
    addItem(newItem);
    setNewItemName("");
    setNewItemQuantity(1);
  };

  const handleRemoveItem = (index: number) => {
    removeItem(index);
  };

  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemQuantity(parseInt(event.target.value));
  };

  const handleQuantityClick = (index: number, quantity: number) => {
    setEditingIndex(index);
    setTempQuantity(quantity);
  };

  const handleUpdateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuantity(parseInt(event.target.value));
  };

  const handleBlur = () => {
    if (editingIndex !== null) {
      updateItemQuantity(editingIndex, tempQuantity);
      setEditingIndex(null);
    }
  };

  const handleResetInventory = () => {
    resetInventoryState();
  };

  const handleSaveInventory = async () => {
    await saveInventory();
  };

  return (
    <PageContainer>
      <Container>
        <Title>Inventory List</Title>
        <TopInputs>
          <div>
            <AddNameInput
              list="product-list"
              value={newItemName}
              onChange={handleItemNameChange}
              placeholder="Product Name"
            />
            {newItemName.length > 0 && (
              <datalist id="product-list">
                {products
                  .filter((product) =>
                    product.toLowerCase().includes(newItemName.toLowerCase())
                  )
                  .map((product, index) => (
                    <option key={index} value={product} />
                  ))}
              </datalist>
            )}
          </div>
          <AddQuantity>
            <AddQuantityInput
              type="number"
              value={newItemQuantity}
              onChange={handleQuantityChange}
              placeholder="Qty"
              min={1}
            />
            <PlusButton onClick={handleAddItem}>+</PlusButton>
          </AddQuantity>
        </TopInputs>
        <ItemListContainer>
          {items.length > 0 && (
            <ResetButton onClick={handleResetInventory}>X</ResetButton>
          )}
          <ItemList>
            {items.map((item, index) => (
              <Item key={index}>
                <Name>{item.name}</Name>
                {editingIndex === index ? (
                  <QuantityInput
                    ref={inputRef}
                    type="number"
                    value={tempQuantity}
                    onChange={handleUpdateQuantity}
                    onBlur={handleBlur}
                    min={1}
                  />
                ) : (
                  <Quantity
                    onClick={() => handleQuantityClick(index, item.quantity)}
                  >
                    {item.quantity}
                  </Quantity>
                )}
                <MinusButton onClick={() => handleRemoveItem(index)}>
                  -
                </MinusButton>
              </Item>
            ))}
          </ItemList>
          {hasChanges && (
            <SaveButton onClick={handleSaveInventory}>Save Changes</SaveButton>
          )}
        </ItemListContainer>
        <CreateNewProductButton as={Link} to="/create-product">
          Create New Product
        </CreateNewProductButton>
      </Container>
    </PageContainer>
  );
};
