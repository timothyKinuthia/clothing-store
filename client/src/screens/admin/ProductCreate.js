import { useState } from "react";
import AdminNav from "./AdminNav";

const ProductCreate = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (evt) => {
    const files = [...evt.target.files];

    // files.forEach(async (file) => {
    //   if (file) {
    //     try {
    //       await Resizer.imageFileResizer(
    //         file,
    //         300,
    //         300,
    //         "JPEG",
    //         100,
    //         0,
    //         (uri) => {
    //           setImages([...images, uri]);
    //         },
    //         "base64",
    //         200,
    //         200
    //       );
    //     } catch (err) {
    //       dispatch({
    //         type: actionTypes.NOTIFY,
    //         payload: { error: "Image not uploaded. Please try another image." },
    //       });
    //     }
    //   }
    // });
  };

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
        <div>images preview</div>
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
