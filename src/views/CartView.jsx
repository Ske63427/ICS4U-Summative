import Header from '../components/Header.jsx';
import { useStoreContext, StoreProvider } from "../context";

function CartView() {
    const { cart, setCart } = useStoreContext();
    console.log(cart);
    // const cartItems = cart._root.entries;


    return (
        <div>
            <Header/>
            {cart.size > 0 ? (
                cart.entrySeq().map(([key, value]) => (
                    <div className="row" style={{ marginBottom: "20px" }} key={key}>
                        <div className="col-xl-1" style={{ marginLeft: "5px" }}>
                            <img
                                width="100"
                                height="80"
                                style={{ height: "150px" }}
                                src={`https://image.tmdb.org/t/p/w500${value.url}`}
                                alt={value.title}
                            />
                        </div>
                        <div className="col-xl-9">
                            <h1>{value.title}</h1>
                            <p>{value.overview}</p>
                        </div>
                        <div className="col">
                            <p
                                style={{ textAlign: "right", marginRight: "25px" }}
                                onClick={() => setCart((prevCart) => prevCart.delete(key))}
                            >
                                Remove
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <h1 style={{textAlign: "center"}}>Nothing in Cart</h1>
            )}
        </div>
    )
}

export default CartView;