import React, { useEffect, useState } from 'react';
import { Heading4 } from 'ui-components';
import { Link } from 'react-router-dom';

import { API_ROOT } from '../env';
import * as S from './Header.styles';

export default ({ isLoggedIn, accessToken, onLogout }) => {
  const [itemsInCart, setItemsInCart] = useState([]);

  const addToCartEventlistener = async ({ detail }) => {
    const newItemInCart = { item: { id: detail.itemId, price: detail.price } };

    try {
      const itemAdded = await fetch(`${API_ROOT.DEV}/cart/1/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': accessToken,
        },
        body: JSON.stringify(newItemInCart)
      }).then(res => res.json());

      setItemsInCart((itemsInCart) => [...itemsInCart, itemAdded]);
    } catch (e) {
      alert('something went wrong')
    }
  };

  const removeFromCartEventlistener = async ({ detail }) => {
    try {
      await fetch(`${API_ROOT.DEV}/items/${detail.itemId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': accessToken,
        }
      }).then(res => res.json());

      setItemsInCart((itemsInCart) => itemsInCart.filter(item => item.id !== detail.itemId));
    } catch (e) {
      alert('something went wrong')
    }
  };

  useEffect(async () => {
    if (isLoggedIn) {
      const itemsInCart = await fetch(`${API_ROOT.DEV}/cart/1/items`, {
        headers: {
          'auth-token': accessToken,
        }
      }).then(res => res.json());

      setItemsInCart(itemsInCart);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    window.addEventListener('ADD_TO_CART', addToCartEventlistener)
    window.addEventListener('REMOVE_FROM_CART', removeFromCartEventlistener)
    return () => {
      window.removeEventListener('ADD_TO_CART', addToCartEventlistener)
      window.removeEventListener('REMOVE_FROM_CART', addToCartEventlistener)
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
                    itemsInCart.length > 0 &&
                    <S.CartCount id="cart-count">{itemsInCart.length}</S.CartCount>
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