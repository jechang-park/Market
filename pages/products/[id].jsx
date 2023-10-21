// pages/products/[id].js
import { useRouter } from 'next/router';
import productData from '../../data/data.json';
import Header from '/components/Header';
import Image from 'next/image';
import { loadTossPayments } from "@tosspayments/payment-sdk";
import React, { useState } from 'react';
import { useCart } from '../../components/cartContext';

export default function ProductDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { cartCount, setCartCount } = useCart();
    const product = productData.find(p => p.id == id);
    const [quantity, setQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); 
    const handleAddToCart = () => {
        // 장바구니에 상품 추가 로직 처리
        setCartCount(prev => prev + 1);
      };

    const handleClick = async () => {
        const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);
        await tossPayments.requestPayment("카드", {
            amount: totalAmount,
            orderId: Math.random().toString(36).slice(2),
            orderName: product.title,
            successUrl: `${window.location.origin}/api/payments`,
            failUrl: `${window.location.origin}/api/payments/fail`,
        });
    };




    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setTotalAmount(product.price * newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) { // 수량이 1보다 클 때만 감소시킵니다.
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotalAmount(product.price * newQuantity);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className='App'>
            <Header />
            <div className='ctn_box'>
                <div className='img'>
                    <Image src={product.src} width={200} height={200} style={{ borderRadius: "30px" }} />
                </div>
                <div className='detail'>
                    <p className='text_0'>{product.title}</p>
                    <p className='text_1'>{product.price}원</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className='button-quantity' onClick={decreaseQuantity} style={{ marginRight: '10px' }}>-</button>
                        <span>{quantity}</span> 
                        <button className='button-quantity' onClick={increaseQuantity} style={{ marginLeft: '10px' }}>+</button>
                    </div>
                    <button className='buy' onClick={handleClick}>바로구매</button>
                    <button className='cart' onClick={handleAddToCart}>장바구니</button>
                    <p className='text_1'>총 금액: {totalAmount.toLocaleString()}원</p>
                </div>
            </div>
        </div>
    );
}
