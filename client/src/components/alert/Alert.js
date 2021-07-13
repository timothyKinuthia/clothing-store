import { useSelector } from 'react-redux';
import ToastContainer from "./ToastContainer"

const Alert = () => {

    const { alert } = useSelector((state) => ({ ...state }));
    return (
        <div>
            {alert.msg && <ToastContainer msg={alert.msg} />}
        </div>
    )
}

export default Alert
