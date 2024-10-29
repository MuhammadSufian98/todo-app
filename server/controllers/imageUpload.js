import ImageModel from "../mongoDB/ImageSchema.js";

export const uploadImage = async (req, res) => {
  try {
    const img = new ImageModel({
      data: req.file.buffer, // Use the buffer from memory storage
      contentType: req.file.mimetype, // Store the MIME type
    });
console.log(img)
    await img.save(); // Save the image to MongoDB
    res.status(201).send("Image uploaded successfully!");
  } catch (error) {
    res.status(500).send("Error uploading image: " + error.message);
  }
};
