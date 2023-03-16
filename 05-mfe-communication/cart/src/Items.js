import React, { useState, useEffect, useCallback } from 'react';
import { Heading4, PText } from 'ui-components';

import * as S from "./Items.styles";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const productsInCart = JSON.parse(localStorage.getItem('products')) || [];
    const productsResponse = await Promise.all(productsInCart.map(productId => fetch(`https://fakestoreapi.com/products/${productId}`)));
    const products = await Promise.all(productsResponse.map(res => res.json()));

    setLoading(false);
    setProducts(products);
  }, []);

  const totalPrice = useCallback(() => {
    const price = products.reduce((total, product) => {
      return total = total + product.price;
    }, 0);
    return price.toFixed(2);
  });

  return (
    <>
      {
        products.length > 0 && !loading && (
          <ul>
            <S.ProductHeaderRow>
              <S.PriceText>Price</S.PriceText>
            </S.ProductHeaderRow>
            {products.map((product, index) => (
              <S.ProductRow key={`${product.id}_${index}`}>
                <S.Image src={product.image} />
                <S.Title>
                  <Heading4>{product.title}</Heading4>
                  <S.Delete>
                    <PText>Remove</PText>
                  </S.Delete>
                </S.Title>
                <strong>
                  <Heading4>{product.price}</Heading4>
                </strong>
              </S.ProductRow>
            ))}
            <S.ProductHeaderRow>
              <S.PriceText>Total: {totalPrice()}</S.PriceText>
            </S.ProductHeaderRow>
          </ul>
        )
      }
      {
        products.length === 0 && !loading && (
          <S.CartEmpty>
            <Heading4>No item in the cart</Heading4>
          </S.CartEmpty>
        )
      }
    </>
  );
}
