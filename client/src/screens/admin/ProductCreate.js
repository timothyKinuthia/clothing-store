import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

import AdminNav from "./AdminNav";
import { globalTypes } from "../../store/actions/globalTypes";
import { postDataApi } from "../../functions/apis";
import { fileUpload } from "../../helpers";

const ProductCreate = () => {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const handleImageChange = (evt) => {
    const files = [...evt.target.files];
    
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
            setImages((prevImages) => [...prevImages, uri])
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }

  };

  const handleSubmit = () => {
    console.log(images.length)
    // postDataApi('images/upload', { images }, auth.token)
  }

  return (
    <div className="overflow-x-hidden flex flex-col sm:flex-row font-vioda font-bold font-viaoda">
      <AdminNav />
      <div>create product</div>
      <div>
        <div>
          <input
            type="file"
            accept="images/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button onClick={handleSubmit}>submit</button>
        <div>images preview </div>
        <div>
          {/* <img className="w-20 h-20" src={images[0]} alt="" /> */}
        </div>
        <div>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
