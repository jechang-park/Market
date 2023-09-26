import { loadTossPayments } from "@tosspayments/payment-sdk";
import Header from '/components/Header';
import Image from 'next/image';

export default function Page() {
  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    //await : 다할때까지 기다려
    await tossPayments.requestPayment("카드", {
      amount: 5000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "맥북",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };
  return (
    <div className="App">
      <Header></Header>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
      <div className="ctn_0" onClick={handleClick}>
        <Image src="/images/338bf913daf68701d321f48adc5fb981.jpg" width={200} height={200}></Image>
        <p>쿵야 레스토랑즈</p>
        <p>25,000원</p>
      </div>
    </div>
  );
}
