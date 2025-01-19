import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';
import PropTypes from 'prop-types';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [cart, setCart] = useState(Map());

    return (
        <StoreContext.Provider value={{ user, setUser, cart, setCart }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}