import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  createSubSubCategory,
  getAllSubSubCategory,
  updateSubSubCategory,
  deleteSubSubCategory,
} from "../../store/actions/subSubActions.js";
import { getAllSubCategory } from "../../store/actions/subActions";
import { globalTypes } from "../../store/actions/globalTypes";
import { IoPencil, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";
import AdminNav from "./AdminNav";
import Dropdown from "./dropdown/Dropdown";

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [updateVal, setUpdateVal] = useState({ update: false });
  const [showSubSubs, setShowSubSubs] = useState(true)

  const dispatch = useDispatch();
  const { auth, subSubs, subCategories } = useSelector((state) => ({
    ...state,
  }));

  useEffect(() => {
    dispatch(getAllSubSubCategory());
    dispatch(getAllSubCategory());
  }, [dispatch]);

  const handleInputChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUpdate = (val) => {
    setName(val.name);
    setUpdateVal({ ...val, update: true });
  };

  const handleDelete = (item) => {
    dispatch(deleteSubSubCategory({ item, token: auth.token }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const subId =
    subCategories.subItems.length > 0 &&
      parent !== "" &&
      subCategories.subItems.find((s) => s.name === parent)._id;

    if (!name || !parent) {
      return dispatch({
        type: globalTypes.ALERT,
        payload: { msg: "Field should not be empty!" },
      });
    }

    if (updateVal.update) {
      const newSubSub = { ...updateVal, name, subId };
      dispatch(updateSubSubCategory({ newSubSub, token: auth.token }));
    } else {
      dispatch(createSubSubCategory({ name, subId, token: auth.token }));
    }
    setName("");
    setParent("");
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
            Create further subcategory
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
                subs={subCategories.subItems}
                parent={parent}
                setParent={setParent}
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
              onClick={() => setShowSubSubs((prev) => !prev)}
              className="flex items-center font-semibold text-lg"
            >
              <span>{`${showSubSubs ? "Hide futher categories" : "Show further subcategories"}`}</span>
              {showSubSubs ? (
                <span className="ml-2">
                  <IoChevronUp />
                </span>
              ) : (
                <span className="ml-2">
                  <IoChevronDown />
                </span>
              )}
            </button>
            {showSubSubs && subSubs.subsubItems.length > 0 &&
              subSubs.subsubItems.map((item) => (
                <div
                  className="mt-2 text-xs sm:text-base px-4 py-2 bg-bluegray-50 border flex justify-between"
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