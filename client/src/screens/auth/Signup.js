
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { globalTypes } from '../../store/actions/globalTypes';
import { validateInput } from './inputValidator';
import { registerUser } from '../../store/actions/authActions';

const inputStyles = "block w-full border border-gray-900 focus:border-gray-900 focus:ring-gray-900";

const Signup = ({history}) => {

    const [userInfo, setUserInfo] = useState({

        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        contactNumber: '',
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

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!validateInput(userInfo, dispatch)) {
            return
        }
        dispatch(registerUser({ userInfo }));

        dispatch({ type: globalTypes.ALERT, payload: {} });
    }

    return (
        <div className="h-full flex justify-center items-center font-ostt">
            <form onSubmit={handleSubmit} autoComplete="off" className="w-5/6 max-w-sm sm:w-1/2 lg:1/4 xl:w-1/4 flex flex-col items-center py-6 px-4 space-y-4 border-black">
                <h3 className="text-3xl font-black text-center">Hello, Welcome</h3>

                <input type="text" name="firstName" value={userInfo.firstName} onChange={handleInputChange} className={inputStyles} placeholder="First Name" />

                <input type="text" name="lastName" value={userInfo.lastName} onChange={handleInputChange}  className={inputStyles} placeholder="Last Name" />

                <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} className={inputStyles} placeholder="Username" />

                <input type="text" name="email" value={userInfo.email} onChange={handleInputChange} className={inputStyles} placeholder="Enter Email" />

                <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} className={inputStyles} placeholder="Enter Password" />

                <input type="number" name="contactNumber" value={userInfo.contactNumber} onChange={handleInputChange} className={inputStyles} placeholder="Contact Number" />

                <button type="submit" className="block w-full py-1 px-4 text-2xl font-medium focus:outline-none bg-gray-900 hover:bg-gray-800 hover:text-gray-200 text-white transition duration-300 ease-in-out">Signup</button>

                <p className="text-lg">Already have an account? <Link className="inline-block ml-2 transform hover:scale-105" to="/login"> Login</Link></p>
            </form>
        </div>
        )
}

export default Signup
