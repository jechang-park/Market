import Header from '/components/Header';
import Image from 'next/image';
import productData from '../data/data.json';
import Link from 'next/link';
export default function Page() {



  return (
    <div className="App">
      <Header />
      <div className="ctn_0">
        <img src="/images/230705_mainbanner_P01.jpg" alt="" />
      </div>
      <div className="ctn_1">
        {productData.map((product) => (
          <Link href={`/products/${product.id}`}>
            <div className="prdImg" key={product.id}>
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
