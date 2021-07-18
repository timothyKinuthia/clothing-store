import Resizer from "react-image-file-resizer";
import { globalTypes } from "./store/actions/globalTypes";

export const fileUpload = (files, setImageFiles, dispatch) => {

    for (let i = 0; i < files.length; i++){
        try {
          Resizer.imageFileResizer(
            files[i],
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                setImageFiles((prevImages) => [...prevImages, uri])
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          dispatch({type: globalTypes.ALERT, payload: {msg: "Images could not be resized. Please try other images"}})
        }
      }

}