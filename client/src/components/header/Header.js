import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Header = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    return (
        <div>
            <div className="px-4 py-2 flex justify-between items-center text-black">
                <h3 className="hidden sm:block">Home</h3>
                <h3 className="sm:mt-0 text-center sm:text-4xl font-monoton">TIMTECH</h3>
                <div className="flex items-center space-x-4">
                    <input className="border-0 focus:border-black py-1" type="text" />
                    {auth.user ? <Link className="" to="/login" onClick={() => dispatch(logout())}>Logout</Link> : <Link className="" to="/login">Login</Link>}
                </div>
            </div>
        </div>
    )
}

export default Header
