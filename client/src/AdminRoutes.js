import { useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ component: Component, props }) => {

    const history = useHistory();

    const { auth } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!auth.user) {
                history.push('/');
            }
            if (auth.user && auth.user.role !== "admin") {
                history.push('/');
            }
        }, 1000)

        return () => clearTimeout(timer);
    }, [auth.token, auth.user, history]);

    return (
        <Route {...props} render={(routeProps) => <Component {...routeProps} /> } />
    )
    
    
};

export default AdminRoutes;
