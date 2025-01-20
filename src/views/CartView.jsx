import Header from '../components/Header.jsx';
import { useStoreContext } from "../context";
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, firestore } from "../firebase";
import { useEffect } from 'react';

function CartView() {
    const { cart, setCart, user } = useStoreContext();

    useEffect(() => {
        // Load cart from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = new Map(JSON.parse(storedCart));
            setCart(parsedCart);
        }
    }, [setCart]);

    const handleCheckout = async () => {
        if (user) {
            const movieIds = Array.from(cart.keys());
            const userDocRef = doc(firestore, 'users', user.uid);

            try {
                await updateDoc(userDocRef, {
                    previousPurchaseHistory: arrayUnion({ movies: movieIds, date: new Date() })
                });
                setCart(new Map());
                localStorage.removeItem('cart');
                alert("Thank you for buying!");
            } catch (error) {
                alert("Error updating purchase history: " + error.message);
            }
        } else {
            alert("You need to be logged in to checkout!");
        }
    };

    const handleRemove = (key) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart);
            newCart.delete(key);
            localStorage.setItem('cart', JSON.stringify(Array.from(newCart.entries())));
            return newCart;
        });
    };

    return (
        <div>
            <Header />
            {cart.size > 0 ? (
                <>
                    <button
                        style={{ margin: "10px", borderRadius: "5px" }}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                    {Array.from(cart.entries()).map(([key, value]) => (
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
                                        style={{ textAlign: "right", marginRight: "25px", cursor: "pointer" }}
                                        onClick={() => handleRemove(key)}
                                    >
                                        Remove
                                    </p>
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