import Header from '/components/Header';
import Image from 'next/image';
import Link from 'next/link';


// productData는 페이지 컴포넌트의 props로 전달됩니다.
export default function Page({ productData }) {
  return (
    <div className="App">
      <Header />
      <div className="ctn_0">
        <img src="/images/230705_mainbanner_P01.jpg" alt="" />
      </div>
      <div className="ctn_1">
        {productData.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="prdImg">
              <Image src={product.src} width={200} height={200} style={{ borderRadius: "30px" }} />
              <p>{product.title}</p>
              <p>{product.price}원</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


// 이 함수는 빌드 시에 실행되어, 페이지가 요청될 때 정적 파일로 제공됩니다.
export async function getStaticProps() {
  // 외부 데이터 소스나 API를 호출할 수 있습니다.
  // 이 예시에서는 로컬 데이터를 사용하므로 직접 import 합니다.
  const productData = require('../data/data.json');

  // props 키로 객체를 반환하여 컴포넌트로 데이터를 전달합니다.
  return { props: { productData } };
}
