import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInventoryStore from "../store/useInventoryState";
import { Title } from "../commonStyles";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  padding: 0px 10px;
`;

const Input = styled.input`
  display: flex;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;

export const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();
  const { addProduct } = useInventoryStore();

  const handleSave = async () => {
    try {
      await addProduct(productName);
      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Title>Create New Product</Title>
        <Input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <SaveButton disabled={productName.length === 0} onClick={handleSave}>
          Save
        </SaveButton>
      </Container>
    </PageContainer>
  );
};
