import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heading1, Heading2, Button, PText, ButtonAction, ButtonSize } from 'ui-components';

import MicroFrontend from "./MicroFrontend";
import { API_ROOT } from './env';
import * as S from './ProductDetails.styles';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(async () => {
    const product = await fetch(`${API_ROOT.DEV}/products/${productId}`).then(res => res.json());
    setProduct(product);
  }, []);

  const addToCart = (e) => {  
    const event = new CustomEvent('ADD_TO_CART', { detail: { product } });
    window.dispatchEvent(event)
  }

  return (
    <>
      <S.Link to={`/products`} id={`go-back`}>
        <PText>← Back</PText>
      </S.Link>
      {
        product.id && (
          <S.ProductDetails>
            <S.ImageContainer>
              <S.ProductImage src={product?.thumbnail} alt={product.title} className="product-image" />
            </S.ImageContainer>
            <S.ProductInfo>
              <section>
                <Heading1>{product.title}</Heading1>
                <S.SpaceTop />
                <Heading2>₹ {product.price}</Heading2>
                <S.SpaceTop />
                <PText>
                  Ratings: {product?.rating?.rate} out of 5. ({product?.rating?.count} reviews)
                </PText>
                <S.SpaceTop />
                <PText>{product.description}</PText>
              </section>
              <Button
                id="add-to-cart"
                buttonType={ButtonAction.PRIMARY}
                size={ButtonSize.DEFAULT}
                onClick={addToCart}>
                Add to Cart
              </Button>
            </S.ProductInfo>
          </S.ProductDetails>

        )
      }
    </>
  );
}
