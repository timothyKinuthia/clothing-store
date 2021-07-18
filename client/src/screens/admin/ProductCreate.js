import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import AdminNav from "./AdminNav";
import { globalTypes } from "../../store/actions/globalTypes";
import { postDataApi } from "../../functions/apis";
import { fileUpload } from "../../helpers";

//styles
const inputStyles = "block w-full";

const ProductCreate = () => {
  const [imagefiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const hiddenInputRef = useRef(null);

  const handleFileUpload = () => {
    hiddenInputRef.current.click();
  };

  const handleImageChange = (evt) => {
    const files = [...evt.target.files];
    fileUpload(files, setImageFiles, dispatch);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await postDataApi("images/upload", { imagefiles }, auth.token);
      setImages(res.data.imgs);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch({type: globalTypes.ALERT, payload: {msg: "Images could not be uploaded. Please try again."}})
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col sm:flex-row font-vioda font-bold font-viaoda">
      <AdminNav />
      <div className="w-full flex-col space-y-6 px-4 font-serif">
        <div className="border-b border-t border-gray-100 flex items-center">
          <h3 className="py-4 text-xl w-1/2 text-center">Create Product</h3>
          <div className="w-1/2 py-1 flex justify-end">
            <span className="mr-6 px-4 py-2.5 bg-black text-white rounded-full">
              A
            </span>
          </div>
        </div>
        <div>
          <button
            className="border-2 border-dashed py-2 px-4 border-gray-200 text-sm text-gray-400 font-semibold"
            onClick={handleFileUpload}
          >
            Choose Images
          </button>
          {imagefiles && <span className="ml-4 text-sm text-gray-400">{imagefiles.length} {" "} files</span>}
          <input
            className="hidden"
            type="file"
            accept="images/*"
            multiple
            ref={hiddenInputRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex items-center">
          <motion.button
            className="btn-primary text-gray-50 font-semibold text-sm"
            onClick={handleSubmit}
            whileTap={{ scale: 0.8 }}
          >
            Upload
          </motion.button>
          <div className="ml-6 grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm bg-red-800 text-red-500">
            {loading ? (
              <span>Continue as your images are uploading...</span>
            ) : images.length === 0 ? (
              <span>No images uploaded yet</span>
            ) : (
              images.map((img) => (
                <div className="" key={img.public_id}>
                  <img className="object-cover" src={img.url} alt="" />
                </div>
              ))
            )}
          </div>
        </div>
        <div>{/* <img className="w-20 h-20" src={images[0]} alt="" /> */}</div>
        <div className="space-y-4">
          <input type="text" className={inputStyles} />
          <input type="text" className={inputStyles} />
          <input type="text" className={inputStyles} />
          <input type="text" className={inputStyles} />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
