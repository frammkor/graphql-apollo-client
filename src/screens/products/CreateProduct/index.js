import React from 'react';
import { ProductForm } from '../../../components';
import { CREATE_PRODUCT } from '../../../mutations';

const CreateProduct = () => (
  <>
    <h2 className="text-center mb-5">Create Product</h2>
    <div className="row justify-content-center">
      <ProductForm propMutation={CREATE_PRODUCT} />
    </div>
  </>
);
export default CreateProduct;
