import Header from '/components/Header';

export default async function Page({ searchParams }) {
  try {
    const secretKey = process.env.TOSS_SECRET_KEY || "";
    const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

    const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }

    const payments = await response.json();

    if (!payments || !payments.card) {
      throw new Error('결제 정보가 없습니다.');
    }

    const { card } = payments;

    return (
      <div className="app">
        <Header></Header>
        <div>
          <h1>결제가 완료되었습니다</h1>
          <ul>
            {payments.orderName && <li>결제 상품 {payments.orderName}</li>}
            {payments.orderId && <li>주문번호 {payments.orderId}</li>}
            {payments.company && <li>카드회사 {payments.company}</li>}
            {card && card.number && <li>카드번호 {card.number}</li>}
            {card && card.amount && <li>결제금액 {card.amount}</li>}
            {payments.approvedAt && (
              <li>
                결제승인날짜{" "}
                {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
              </li>
            )}
          </ul>

        </div>
      </div>
    );
  } catch (error) {
    // 에러 처리를 여기에서 수행하고 사용자에게 에러 메시지를 표시합니다.
    return (
      <div className="app">
        <Header></Header>
        <div>
          <h1>에러 발생</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
}
