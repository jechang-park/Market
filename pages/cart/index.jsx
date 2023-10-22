// pages/cart.js
import React from 'react';
import { useCart } from '../../components/cartContext';
import Header from '../../components/Header';
import Image from 'next/image';
import { loadTossPayments } from "@tosspayments/payment-sdk";

const CartPage = () => {
    const { cartItems, setCartItems } = useCart();




    const handleRemoveFromCart = (productId) => {
        // 장바구니에서 상품 제거
        const updatedItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedItems);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        // 상품의 수량을 업데이트
        const updatedItems = cartItems.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
    };



    const handleClick = async () => {
        // 선택된 상품들에 대한 결제 처리 로직
        // 예를 들어, 전체 가격 계산, 결제 API 호출 등

        // 여기서는 전체 가격을 계산하는 간단한 예를 듭니다.
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        try {
            // 예: TossPayments 등의 결제 서비스를 이용하여 결제 진행
            const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);
            await tossPayments.requestPayment("카드", {
                amount: totalAmount, // 총 결제 금액
                orderId: Math.random().toString(36).slice(2), // 주문 번호 (실제 서비스에서는 적절한 주문 번호를 생성해야 합니다)
                orderName: "장바구니 상품 구매", // 주문 이름
                successUrl: `${window.location.origin}/api/payments/success`, // 결제 성공 시 이동할 URL
                failUrl: `${window.location.origin}/api/payments/fail`, // 결제 실패 시 이동할 URL
            });
            // 결제가 성공적으로 진행된 후의 로직 (예: 데이터베이스에 주문 정보 저장 등)을 여기에 추가합니다.
        } catch (error) {
            // 결제 과정에서 오류가 발생한 경우의 처리를 여기에 작성합니다.
            console.error("결제 실패:", error);
        }
    };


    // 장바구니에 상품이 없을 경우
    if (cartItems.length === 0) {
        return (
            <div className='App'>
                <Header />
                <p>장바구니가 비어있습니다.</p>
            </div>
        );
    }

    return (
        <div className='App'>
            <Header />
            <h1>장바구니</h1>
            <div className='cart-items'>
                {cartItems.map((product) => (
                    <div key={product.id} className='cart-item'>
                        <Image src={product.src} width={200} height={200} margin={50} alt={product.title} />
                        <div className='cart-item-info'>
                            <h2>{product.title}</h2>
                            <p>{product.price.toLocaleString()}원</p>
                            <input 
                                type='number' 
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                            />
                            <button onClick={() => handleRemoveFromCart(product.id)}>
                                제거
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className='buy' onClick={handleClick}>바로구매</button>

        </div>
    );
};

export default CartPage;
