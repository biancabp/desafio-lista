import { createContext, useEffect, useState } from "react";

// Declare o AuthContext aqui
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const signin = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        
        const hasUser = usersStorage?.filter((user) => user.email === email);
        
        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({ email, token }));

                // Armazena o role do usuário no estado e localStorage
                setUser({ email, password, role: hasUser[0].role });
                localStorage.setItem("role", hasUser[0].role);

                return;
            } else {
                return "E-mail ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        }
    };
    
    const signup = (email, password, role) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        
        const hasUser = usersStorage?.filter((user) => user.email === email);
        
        if (hasUser?.length) {
            return "Já tem uma conta com esse E-mail";
        }
        
        let newUser;
        
        if (usersStorage) {
            newUser = [...usersStorage, { email, password, role }];
        } else {
            newUser = [{ email, password, role }];
        }

        localStorage.setItem("users_db", JSON.stringify(newUser));

        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
        localStorage.removeItem("role"); 
    };

    return (
        <AuthContext.Provider 
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    ); 
};


