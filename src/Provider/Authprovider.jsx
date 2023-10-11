import React, { createContext} from 'react';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';

const Authcontext = createContext()
const auth = getAuth(app)

const Authprovider =  ({ children })  => {


    const authinfo={

    }

    return (
       <Authcontext.Provider value={authinfo}>
            {children}
       </Authcontext.Provider>
    );
};

export default Authprovider;