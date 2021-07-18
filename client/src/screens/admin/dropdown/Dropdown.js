import { Fragment } from "react";
import { IoChevronDown, IoChevronUp, IoCheckmarkSharp } from "react-icons/io5";
import { Listbox, Transition } from "@headlessui/react";

export default function Example({ cats, subs, subsubs, subCatParent, setSubCatParent, furSubCatP, setFurSubCatP  }) {
  let list = [];
  let val = '';
  let onChangeHandler = '';

  if (cats && cats.length > 0) {
    list = cats;
    val = subCatParent
    onChangeHandler = setSubCatParent
  }

  if (subs && subs.length > 0) {
    list = subs;
    val = furSubCatP
    onChangeHandler = setFurSubCatP
  }

  if (subsubs && subsubs.length > 0) {
    list = subsubs;
  }

  return (
    <div className="w-full font-serif">
      <Listbox value={val} onChange={onChangeHandler}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
            <span
              className={`block truncate ${
                val ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {val !== ""
                ? val
                : `Choose ${subsubs ? 'Further category' : subs ? "SubCategory" : "category"}`}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="flex flex-col text-gray-500 justify-center h-5">
                <IoChevronUp />
                <IoChevronDown />
              </span>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base text-gray-900 bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm cursor-pointer">
              {list.map((item) => (
                <Listbox.Option
                  key={item._id}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          select-none relative py-2 pl-10 pr-4 hover:bg-gray-50`
                  }
                  value={item.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <IoCheckmarkSharp />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
