const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

exports.upload = async (req, res, next) => {
    
    try {

        const { images } = req.body;

        let imgArr = []

        for (let image of images) {

            const res = await cloudinary.uploader.upload(image, {
                upload_preset: "r8e1brbw"
            })
    
            imgArr.push({url: res.secure_url, public_id: res.public_id });
        }

        res.status(201).json({ imgArr });

    } catch (err) {
        
        console.log(err)
        next(err)
    }
}