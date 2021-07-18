import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../store/actions/subActions";
import { getAllCategories } from "../../store/actions/categoryActions";
import { globalTypes } from "../../store/actions/globalTypes";
import { IoPencil, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";
import AdminNav from "./AdminNav";
import Dropdown from "./dropdown/Dropdown";

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [subCatParent, setSubCatParent] = useState("");
  const [updateVal, setUpdateVal] = useState({ update: false });
  const [showSubs, setShowSubs] = useState(true)

  const dispatch = useDispatch();
  const { auth, subCategories, categories } = useSelector((state) => ({
    ...state,
  }));

  useEffect(() => {
    dispatch(getAllSubCategory());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUpdate = (val) => {
    setName(val.name);
    setUpdateVal({ ...val, update: true });
  };

  const handleDelete = (item) => {
    dispatch(deleteSubCategory({ item, token: auth.token }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const catId =
      categories.catItems.length > 0 &&
      subCatParent !== "" &&
      categories.catItems.find((p) => p.name === subCatParent)._id;

    if (!name || !subCatParent) {
      return dispatch({
        type: globalTypes.ALERT,
        payload: { msg: "Field should not be empty!" },
      });
    }

    if (updateVal.update) {
      const newSub = { ...updateVal, name, catId };
      dispatch(updateSubCategory({ newSub, token: auth.token }));
    } else {
      dispatch(createSubCategory({ name, catId, token: auth.token }));
    }
    setName("");
    setSubCatParent("");
    setUpdateVal({ update: false });
  };
  return (
    <div
      onClick={() => dispatch({ type: globalTypes.ALERT, payload: {} })}
      className="overflow-x-hidden flex flex-col sm:flex-row font-vioda font-bold font-viaoda"
    >
      <AdminNav />
      <div className="flex-1">
        <div className="border-b border-t border-gray-100 flex items-center">
          <h3 className="py-4 text-xl w-1/2 text-center">
            Create Sub-category
          </h3>
          <div className="w-1/2 py-1 flex justify-end">
            <span className="mr-6 px-4 py-2.5 bg-black text-white rounded-full">
              A
            </span>
          </div>
        </div>
        <div className="sm:flex-1 h-screen md:flex">
          <form
            onSubmit={handleSubmit}
            className="mt-4 sm:mt-0 md:border-r border-gray-100 sm:py-4 md:w-1/2 pb-4 px-2 flex flex-col md:items-start space-y-4"
          >
            <div className="w-full space-y-6">
              <Dropdown
                cats={categories.catItems}
                subCatParent={subCatParent}
                setSubCatParent={setSubCatParent}
              />
              <input
                className="w-full font-serif border border-gray-200"
                type="text"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <motion.button
              className="w-full md:w-1/4 py-2 px-4 border border-gray-200 font-bold hover:bg-gray-800 hover:text-gray-100 transition duration-150"
              type="submit"
              whileTap={{ scale: 0.9 }}
            >
              ADD
            </motion.button>
          </form>
          <div className="flex-1 sm:mt-2 sm:py-2 px-2 sm:px-6">
            <button
              onClick={() => setShowSubs((prev) => !prev)}
              className="flex items-center font-semibold text-lg"
            >
              <span>{`${showSubs ? "Hide subcategories" : "Show subcategories"}`}</span>
              {showSubs ? (
                <span className="ml-2">
                  <IoChevronUp />
                </span>
              ) : (
                <span className="ml-2">
                  <IoChevronDown />
                </span>
              )}
            </button>
            {showSubs && subCategories.subItems.length > 0 &&
              subCategories.subItems.map((item) => (
                <div
                  className="mt-2 px-4 py-2 bg-bluegray-50 border flex justify-between"
                  key={item._id}
                >
                  {item.name}
                  <div className="flex">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="hover:text-red-700"
                    >
                      <IoPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="ml-6 hover:text-red-700"
                    >
                      <IoTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
