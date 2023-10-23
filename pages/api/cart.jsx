// pages/api/cart.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const cartItem = req.body; // 요청 본문에서 장바구니 항목 데이터를 가져옵니다.

            // 여기에서 당신의 데이터베이스에 장바구니 항목을 추가하는 로직을 작성합니다.
            // 예를 들어, 데이터베이스에 연결하고 cartItem을 저장하는 과정이 필요합니다.

            res.status(200).json({ success: true, message: '장바구니에 상품이 추가되었습니다.', cartItem });
        } catch (error) {
            res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
        }
    } else {
        // POST 요청이 아닌 경우, 405 Method Not Allowed를 반환합니다.
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
