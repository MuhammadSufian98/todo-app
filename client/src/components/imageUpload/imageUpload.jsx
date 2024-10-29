import React, { useState } from "react";
import "./imageUpload.css";
import arrowIcon from "./arrow.png";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [ImagePreviewUrl, setImagePreviewUrl] = useState("");

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreviewUrl(URL.createObjectURL(selectedFile));
    }
  }

  async function handleUpload() {
    // Check if a file has been selected
    if (!file) {
      console.log("No file selected!");
      return;
    }
  
    try {
      const formData = new FormData();
      // Append the selected file to the FormData object
      formData.append("image", file); // Use "image" if that's the field name in your server
  
      // Make a POST request to upload the file
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure the content type is set for file uploads
        }
      });
  
      // Clear the image preview URL or any other state as needed
      setImagePreviewUrl(""); 
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }
  

  return (
    <div className="Main">
      <div className="InnerMain">
        <div className="Heading">Upload your image</div>
        <div className="Upload-Outter">
          <div className="Upload-File">
            <div className="Upload-Input-BTN">
              <div className="Upload-Input-BTN-Inner">
                <div className="Upload-Img-Div">
                  <input
                    type="file"
                    name="picture"
                    id="UploadBTN"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="UploadBTN"
                    className="InputLabel"
                  >
                    Upload
                    <span>
                      <img
                        src={arrowIcon}
                        alt="arrow"
                        className="UploadLabelImg"
                      />
                    </span>
                  </label>
                  <button
                    className="BTNstyling"
                    onClick={handleUpload}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Upload-Imag-Details">
            <img
              src={ImagePreviewUrl}
              className="ImagePreview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
