// contexts/cartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    let newCartItems = [...cartItems]; // 현재 장바구니 항목의 사본을 만듭니다.

    if (existingProductIndex !== -1) {
      // 상품이 이미 장바구니에 있으면 수량을 증가시키고, 총 가격을 업데이트합니다.
      const existingProduct = newCartItems[existingProductIndex];
      const updatedQuantity = existingProduct.quantity + 1; // 수량을 업데이트합니다.
      const updatedTotalPrice = updatedQuantity * product.price; // 총 가격을 계산합니다.

      newCartItems[existingProductIndex] = {
        ...existingProduct,
        quantity: updatedQuantity,
        totalPrice: updatedTotalPrice, // 총 가격 정보를 업데이트합니다.
      };
    } else {
      // 새 상품이라면, 상품 데이터에 'quantity' 및 'totalPrice' 필드를 추가하고 장바구니에 삽입합니다.
      const newProduct = {
        ...product,
        quantity: 1,
        totalPrice: product.price, // 초기 상품 가격은 상품의 단가와 같습니다.
      };
      newCartItems.push(newProduct);
    }

    setCartItems(newCartItems); // 장바구니 상태를 업데이트합니다.
    setCartCount(prevCount => prevCount + 1); // 장바구니에 담긴 상품 개수를 업데이트합니다.
    console.log("newCartItems", newCartItems)

  };
  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
