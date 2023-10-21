import Image from 'next/image';


const Header = () => {
    return (
        <div>
            <div className="header">
                <div className="header_sec01">
                    <div className='top_logo'>
                        <Image src="/images/c94f19709256f998ba9c90df4dcf959e.png"
                            width={200}
                            height={25}
                        ></Image>
                    </div>
                    <ul className='cate'>
                        <li>
                        </li>
                        <li>BEST</li>
                        <li>NEW</li>
                        <li><Image src="/images/top_cart.png" alt="Cart Icon" width={30} height={30} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
