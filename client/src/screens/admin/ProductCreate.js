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
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    color: '',
    offer: '',
    createdBy: ''
  });

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const hiddenInputRef = useRef(null);

  const handleFileUpload = () => {
    hiddenInputRef.current.click();
  };

  const handleImageChange = (evt) => {
    const files = [...evt.target.files];
    fileUpload(files, setImageFiles, dispatch);
    setImageFiles([]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await postDataApi(
        "images/upload",
        { imagefiles },
        auth.token
      );
      setImages((prevImgs) => [...prevImgs, ...res.data.imgs]);
      setLoading(false);
      setImageFiles([]);
    } catch (err) {
      setLoading(false);
      dispatch({
        type: globalTypes.ALERT,
        payload: { msg: "Images could not be uploaded. Please try again." },
      });
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col sm:flex-row font-vioda font-bold font-viaoda">
      <AdminNav />
      <div className="w-full flex-col space-y-6 px-4 font-serif">
        <div className="border-b border-t border-gray-100 flex items-center">
          <h3 className="py-4 text-xl w-1/2 text-center font-viaoda">Create Product</h3>
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
          {imagefiles && (
            <span className="ml-4 text-sm text-gray-400">
              {imagefiles.length} files
            </span>
          )}
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
            className={`${loading ? "pointer-events-none" : ""} btn-primary text-gray-50 font-semibold text-sm`}
            onClick={handleSubmit}
            whileTap={{ scale: 0.8 }}
          >
            Upload
          </motion.button>
          <div className="ml-3 sm:ml-6 w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-red-600">
            {loading ? (
              <span>Continue as your images are uploading...</span>
            ) : images.length === 0 ? (
              <span>No images uploaded yet</span>
            ) : (
              images.map((img) => (
                <div className="w-24 h-36">
                  <img
                    className="w-full h-full object-cover"
                    src={img.url}
                    alt=""
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="space-y-4">
          <input type="text" name="name" value={product.name} className={inputStyles} />
          <input type="number" name="price" value={product.price} className={inputStyles} />
          <input type="number" name="quantity" value={product.quantity} className={inputStyles} />
          <input type="text" name="description" value={product.description} className={inputStyles} />
          <input type="text" name="color" value={product.color} className={inputStyles} />
          <input type="text" name="offer" value={product.offer} className={inputStyles} />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;