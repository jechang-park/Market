// pages/products/[id].js
import { useRouter } from 'next/router';
import productData from '../../data/data.json';
import Header from '/components/Header';
import Image from 'next/image';
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function ProductDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const product = productData.find(p => p.id == id);

    const handleClick = async () => {
        const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);
        await tossPayments.requestPayment("카드", {
            amount: product.price,
            orderId: Math.random().toString(36).slice(2),
            orderName: product.title,
            successUrl: `${window.location.origin}/api/payments`,
            failUrl: `${window.location.origin}/api/payments/fail`,
        });
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className='App'>
            <Header />
            <div>
                <Image src={product.src} width={200} height={200} style={{ borderRadius: "30px" }} />
                <p>{product.title}</p>
                <p>{product.description}</p>
                <p>{product.price}원</p>
                <button onClick={handleClick}>바로구매</button>
            </div>
        </div>
    );
}
