import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({pizza}) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  }

  const handleSize = (sizeIdx) => {
    if(sizeIdx !== size){
      const difference = pizza.prices[sizeIdx] - pizza.prices[size];
      setSize(sizeIdx);
      changePrice(difference);
    }
  }

  const handleChange = (e, ex) => {
    const checked = e.target.checked;
    if(checked){
      changePrice(ex.price);
      setExtras((prev)=>[...prev, ex]);
    } else {
      changePrice(-ex.price);
      setExtras(extras.filter(extra=>extra._id !== ex._id));
    }
  }

  const handleClick = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Escolha o tamanho</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Pequena</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Média</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Grande</span>
          </div>
        </div>
        <h3 className={styles.choose}>Ingredientes adicionais</h3>
        <div className={styles.ingredients}>
          {
            pizza.extras.map((ex)=>(
              <div className={styles.option} key={ex._id}>
                <input
                  type="checkbox"
                  id={ex.text}
                  name={ex.text}
                  className={styles.checkbox}
                  onChange={(e)=> handleChange(e, ex)}
                />
                <label htmlFor={ex.text}>{ex.text}</label>
              </div>
            ))
          }
        </div>
        <div className={styles.add}>
            <input type="number" defaultValue={1} min={1} onChange={(e) => setQuantity(e.target.value)} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  );
};


export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    }
  }
}

export default Product;
