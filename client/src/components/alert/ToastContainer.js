
import { motion } from 'framer-motion';

const ToastContainer = ({ msg }) => {
    
    const toastVariants = {
        hidden: {
            x: '100vw'
        },
        visible: {
            x: 0,
            transition: {type: "spring", stiffness: 80}
        }
    }

    return (
        <motion.div className="fixed z-50 top-4 right-4 py-4 px-4 bg-white border-2 border-red-500" variants={toastVariants} initial='hidden' animate='visible' >
            <div className="font-ostt text-lg text-red-600 font-bold">
                {msg}
            </div>
        </motion.div>
    )
}

export default ToastContainer
