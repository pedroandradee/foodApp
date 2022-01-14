import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>FAÇA O SEU PEDIDO!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Início</li>
          <li className={styles.listItem}>Produtos</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          <li className={styles.listItem}>Eventos</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contato</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
            <div className={styles.cart}>
              <Image src="/img/cart.png" alt="" width="30px" height="30px" />
              <div className={styles.counter}>{quantity}</div>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
