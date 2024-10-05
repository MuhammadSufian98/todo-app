import React from "react";
import "./imageUpload.css";
import arrowIcon from "./arrow.png";

export default function ImageUpload() {
  return (
    <div className="Main">
      <div className="InnerMain">
        <div className="Heading">Upload your image</div>
        <div className="Upload-File">
          <div className="Upload-Input-BTN">
            <form
              action="/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <input
                type="file"
                name="picture"
                id="UploadBTN"
              />
              <label
                for="UploadBTN"
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
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
