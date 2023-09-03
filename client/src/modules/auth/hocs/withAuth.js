import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth.context"


export const withAuth = (Component) => {
    const WrappedComponent = () => {
        const { isAuth } = useAuth();
        const { pathname } = useLocation();

        if (!isAuth) {
            return (
                <Navigate
                    to="/login"
                    state={{from: pathname}}
                    replace={true}
                />
            )
        }

        return <Component />
    }

    return WrappedComponent
}
