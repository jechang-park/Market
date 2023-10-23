// pages/products/[id].js
import Header from '/components/Header';
import Image from 'next/image';
import { loadTossPayments } from "@tosspayments/payment-sdk";
import React, { useState } from 'react';

export default function ProductDetailPage({ product }) {  // props 객체를 구조 분해 할당하여 product를 직접 가져옵니다.
    const [quantity, setQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    const handleAddToCart = async () => {
        const cartItem = { ...product, quantity };

        try {
            // 여기서 /api/cart는 당신의 서버 측 API 경로입니다.
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem), // 상품 데이터를 JSON으로 변환하여 요청 본문에 넣습니다.
            });

            if (!response.ok) {
                throw new Error('장바구니에 상품을 추가하는 데 실패했습니다.');
            }

            // 필요한 경우, 응답으로부터 추가 데이터를 받아 처리합니다.
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
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

    console.log("props.product", product);

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

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    // id를 정수로 변환합니다.
    const numericId = parseInt(id, 10);


    // 여기서 실제 서버나, 외부 API로부터 데이터를 가져올 수 있습니다.
    // 이 예제에서는 정적 데이터를 사용합니다.
    const productData = require('../../data/data.json');
    const product = productData.find(p => p.id === numericId);

    // 찾지 못한 경우 404 페이지를 반환할 수 있습니다.
    if (!product) {
        return { notFound: true };
    }

    // 페이지 컴포넌트로 props를 전달합니다.
    return { props: { product } };
}