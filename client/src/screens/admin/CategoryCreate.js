import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../../store/actions/categoryActions";
import { IoPencil, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";
import AdminNav from "./AdminNav";
import { globalTypes } from "../../store/actions/globalTypes";

const CategoryCreate = () => {

  const [name, setName] = useState('');
  const [updateVal, setUpdateVal] = useState({ update: false });
  const [showCategories, setShowCategories] = useState(false)

  const dispatch = useDispatch();
  const { auth, categories } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = (evt) => {
    dispatch({ type: globalTypes.ALERT, payload: {} });
    setName(evt.target.value);
  };

  const handleUpdate = (val) => {
    setName(val.name);
    setUpdateVal({ ...val, update: true });
  }

  const handleDelete = (item) => {
    dispatch(deleteCategory({ item, token: auth.token }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!name) {
      return dispatch({ type: globalTypes.ALERT, payload: { msg: "Field should not be empty!" } });
    }

    if (updateVal.update) {
      const newCat = {...updateVal, name}
      dispatch(updateCategory({ newCat, token: auth.token }));
    } else {
      dispatch(createCategory({ name, token: auth.token }));
    }
    setName('');
    setUpdateVal({ update: false });

  }
  return (
    <div>
      <div className="overflow-x-hidden flex flex-col sm:flex-row font-vioda font-bold font-viaoda">
        <AdminNav />
        <div className="flex-1">
          <div className="border-b border-t border-gray-100 flex items-center">
              <h3 className="py-4 text-xl w-1/2 text-center">Create Category</h3>
              <div className="w-1/2 py-1 flex justify-end">
                  <span className="mr-6 px-4 py-2.5 bg-black text-white rounded-full">A</span>
              </div>
          </div>
          <div className="sm:flex-1 h-screen md:flex">
            <form onSubmit={handleSubmit} className="mt-4 sm:mt-0 md:border-r border-gray-100 sm:py-4 md:w-1/2 pb-4 px-2 flex items-center md:items-start">
              <input className="w-2/3 py-2 border-gray-200 border font-serif" type="text" value={name} onChange={handleInputChange} />
              <motion.button
                className="w-1/3 md:w-1/4 ml-8 py-2 px-4 border border-gray-200 font-bold hover:bg-gray-800 hover:text-gray-100 transition duration-150"
                type="submit" whileTap={{scale: 0.9}}
              >
                ADD
              </motion.button>
            </form>
            <div className="flex-1 sm:mt-2 sm:py-2 px-2 sm:px-6">
              <button onClick={() => setShowCategories((prev) => !prev)} className="flex items-center font-semibold text-lg">
                <span>Show Categories</span>
                {showCategories ? <span className="ml-2"><IoChevronUp/></span> : <span className="ml-2"><IoChevronDown/></span>}
              </button>
              {showCategories && categories.catItems.length > 0 && categories.catItems.map((item) => (
                <div className="px-4 py-2 bg-bluegray-50 border my-2 flex justify-between" key={item._id} >
                  {item.name}
                  <div className="flex">
                    <button onClick={() => handleUpdate(item)} className="hover:text-red-700"><IoPencil/></button>
                    <button onClick={() => handleDelete(item)} className="ml-6 hover:text-red-700"><IoTrash/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
