import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";


const Cart = () => {
  const [open, setOpen] = useState(false);
  const amount = 2;
  const currency = "BRL";
  const style = {"layout": "vertical"};

  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);

  const ButtonWrapper = ({ currency, showSpinner}) => {
    const [{ options, isPending}, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        { (showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions)=>{
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  }
                }
              ]
            }).then((orderId) =>{
              return orderId;
            });
          }}
          onApprove={function (data, actions){
            return actions.order.capture().then(function (){

            })
          }}
        />
      </>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Produto</th>
            <th>Nome</th>
            <th>Extras</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
          </tr>
          {cart.products.map(p=>(
            <tr className={styles.tr} key={p._id}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={p.img}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{p.title}</span>
              </td>
              <td>
                <span className={styles.extras}>
                  {
                    p.extras.length > 0 ? (
                      p.extras.map((ex, idx)=>(
                        <span key={ex._id} >
                          {
                            idx < p.extras.length - 1 ? (ex.text + ", ") : 
                            ex.text
                          }
                        </span>
                      ))) :
                    "Sem extras"
                  }
                </span>
              </td>
              <td>
                <span className={styles.price}>${p.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{p.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>${p.price * p.quantity}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CARRINHO TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Desconto:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {
            open ? (
              <div className={styles.paymentMethods}>
                <button className={styles.payButton}>PAGAR NA ENTREGA</button>
                <PayPalScriptProvider
                  options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "BRL",
                    "disable-funding": "credit,card,mercadopago",
                  }}
                >
                  <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button className={styles.button} onClick={()=>setOpen(true)}>CHECKOUT NOW!</button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
