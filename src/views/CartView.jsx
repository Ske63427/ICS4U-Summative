import Header from '../components/Header.jsx'
import { useStoreContext } from "../context"
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, firestore } from "../firebase"

function CartView() {
    const { cart, setCart, user } = useStoreContext()

    const handleCheckout = async () => {
        if (user) {
            const movieIds = cart.keySeq().toArray()
            const userDocRef = doc(firestore, 'users', user.uid)

            try {
                await updateDoc(userDocRef, {
                    previousPurchaseHistory: arrayUnion({ movies: movieIds, date: new Date() })
                })
                setCart(new Map())
                alert("Thank you for buying!")
            } catch (error) {
                alert("Error updating purchase history: " + error.message)
            }
        } else {
            alert("You need to be logged in to checkout!")
        }
    };

    return (
        <div>
            <Header />
            {cart.size > 0 ? (
                <>
                    <button
                        style={{ margin: "10px", borderRadius: "5px" }}
                        onClick={handleCheckout}
                    >Checkout</button>
                    {cart.entrySeq().map(([key, value]) => (
                        <div key={key}>
                            <div className="row"
                                 style={{ marginBottom: "20px", backgroundColor: "dimGray", padding: "5px 0px" }}>
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
                                </div>
                                <div className="col">
                                    <p
                                        style={{ textAlign: "right", marginRight: "25px" }}
                                        onClick={() => setCart((prevCart) => prevCart.delete(key))}
                                    >Remove</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>Nothing in Cart</h1>
            )}
        </div>
    );
}

export default CartView;
