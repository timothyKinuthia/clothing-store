export const imageUploader = async (images) => {
    let imgArray = [];

    for (const item of images) {
        const formData = new FormData();

        formData.append("file", item);

        formData.append("upload_preset", "r8e1brbw");

        formData.append("cloud_name", "dciettpml");

        const res = await fetch("https://api.cloudinary.com/v1_1/dciettpml/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json();

        imgArray.push({public_id: data.public_id, url: data.secure_url})
    }

    return imgArray;
}