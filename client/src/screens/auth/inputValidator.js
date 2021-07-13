import { globalTypes } from '../../store/actions/globalTypes';
    
export const validateInput = (val, dispatch) => {

        const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let error = {};
        for (let key in val) {
            if (val[key].trim() === '') {
                error.msg = "All fields are required"
            };

            if (key === 'email') {
                if (!re.test(val[key])) {
                    error.msg = "Invalid email!"
                }
            }
        };
        if (error.msg) {
            dispatch({ type: globalTypes.ALERT, payload: error });
            return false;
        };
        return true
    }