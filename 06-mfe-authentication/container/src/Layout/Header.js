import React, { useEffect, useState } from 'react';
import { Heading4 } from 'ui-components';
import { Link } from 'react-router-dom';

import * as S from './Header.styles';

export default ({ isLoggedIn, onLogout }) => {
  const [productsInCart, setProductsInCart] = useState(JSON.parse(localStorage.getItem('products')) || []);

  const addToCartEventlistener = ({ detail }) => {
    const currentProductsInCart = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProductsInCart = Array.from(new Set([...currentProductsInCart, detail.product]));

    setProductsInCart(updatedProductsInCart);
    localStorage.setItem('products', JSON.stringify(updatedProductsInCart));
  };

  const removeFromCartEventlistener = ({ detail }) => {
    const currentProductsInCart = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProductsInCart = currentProductsInCart.filter(p => p.id !== detail.product.id);

    setProductsInCart(updatedProductsInCart);
    localStorage.setItem('products', JSON.stringify(updatedProductsInCart));
  };

  useEffect(() => {
    window.addEventListener('ADD_TO_CART', addToCartEventlistener)
    window.addEventListener('REMOVE_FROM_CART', removeFromCartEventlistener)
    return () => {
      window.removeEventListener('ADD_TO_CART', addToCartEventlistener)
      window.removeEventListener('REMOVE_FROM_CART', removeFromCartEventlistener)
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('authToken');
    onLogout();
  }

  return (
    <S.Header>
      <div className='container'>
        <S.Content>
          <Link to="/products">
            <Heading4>CBP Marketplace</Heading4>
          </Link>
          {
            isLoggedIn ?
              <div>
                <S.CartLink id="go-to-cart" to="/cart">
                  Cart
                  {
                    productsInCart.length > 0 &&
                    <S.CartCount id="cart-count">{productsInCart.length}</S.CartCount>
                  }
                </S.CartLink>
                <span id="Logout" onClick={logout}>Logout</span>
              </div>
              :
              <Link id="go-to-login" to="/login">Login</Link>
          }
        </S.Content>
      </div>
    </S.Header>
  )
}