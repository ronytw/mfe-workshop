import React, { useState, useEffect } from 'react';

import { API_ROOT } from '../env';

import { Heading3, PText } from 'ui-components';
import * as S from './ProductList.styles';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const productList = await fetch(`${API_ROOT.DEV}/products`).then(res => res.json());

    setProducts(productList.products);
  }, []);

  return (
    <S.ProductList>
      {products.map((product) => (
        <S.Card key={`${product.id}`} className="product_card">
          <S.Link to={`/products/${product.id}?category=${product.category}`} id={`go-to-product-details-${product.id}`}>
            <S.Image src={product.thumbnail} />
          </S.Link>
          <S.Details>
            <S.Title>{product.title}</S.Title>
            <PText>{product.category}</PText>
            <PText>{product.rating.rate} out of 10</PText>
            <S.PriceRow>
              <Heading3>₹ {product.price}</Heading3>            
            </S.PriceRow>
          </S.Details>
        </S.Card>
      ))}
    </S.ProductList>
  );
}
