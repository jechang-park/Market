import '../styles/global.css';
import { CartProvider } from '../components/cartContext';
function MyApp({ Component, pageProps }) {
  return <CartProvider><Component {...pageProps} /></CartProvider>;
}

export default MyApp;
