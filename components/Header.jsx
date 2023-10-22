import Image from 'next/image';
import { useCart } from './cartContext';
import Link from 'next/link';
const Header = () => {

    const { cartCount } = useCart();
    return (
        <div>
            <div className="header">
                <div className="header_sec01">
                    <div className='top_logo'>
                        <Link href="/">      <Image src="/images/c94f19709256f998ba9c90df4dcf959e.png"
                            width={200}
                            height={25}
                        ></Image></Link>
                    </div>
                    <ul className='cate'>
                        <li>
                        </li>
                        <li>BEST</li>
                        <li>NEW</li>
                        <li>
                        <Link href="/cart">
                            <Image src="/images/top_cart.png" alt="Cart Icon" width={30} height={30} />
                            ({cartCount})</Link></li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Header;
