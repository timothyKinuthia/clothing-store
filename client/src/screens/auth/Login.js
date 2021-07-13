import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { validateInput } from './inputValidator';
import { useSelector, useDispatch } from 'react-redux';
import { globalTypes } from '../../store/actions/globalTypes';
import { loginUser } from '../../store/actions/authActions';


const inputStyles = "block w-full border border-gray-900 focus:border-gray-900 focus:ring-gray-900";

const Login = ({history}) => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (auth.token) {
            history.push("/")
        }
    }, [auth.token, history]);

    const handleInputChange = (evt) => {
        dispatch({ type: globalTypes.ALERT, payload: {} });
        setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!validateInput(userInfo, dispatch)) {
            return
        }
        dispatch(loginUser({ userInfo }));
        dispatch({ type: globalTypes.ALERT, payload: {} });
    }

    return (
        <div className="h-screen mt-4 flex justify-center items-start font-ostt">
            <form onSubmit={handleSubmit} className="w-5/6 max-w-sm sm:w-1/2 lg:1/4 xl:w-1/4 flex flex-col items-center py-6 px-4 space-y-4 border-black">
                <h3 className="text-3xl font-black text-center">Welcome Back</h3>

                <input type="text" name="email" value={userInfo.email} onChange={handleInputChange} className={inputStyles} placeholder="Enter Email" />
                
                <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} className={inputStyles} placeholder="Enter Password" />

                <button type="submit" className="block w-full py-1 px-4 text-2xl font-medium focus:outline-none bg-gray-900 hover:bg-gray-800 hover:text-gray-200 text-white transition duration-300 ease-in-out">Login</button>

                <p className="text-lg">Don't have an account? <Link className="inline-block ml-2 transform hover:scale-105" to="/signup"> Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
