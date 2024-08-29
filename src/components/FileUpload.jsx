import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  let startTime;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setTimeRemaining(0); // Reset time remaining
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    startTime = Date.now();

    try {
      const response = await axios.post(
        "http://localhost:3000/upload/storage",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
            const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
            const uploadSpeed = progressEvent.loaded / elapsedTime; // bytes per second
            const bytesRemaining = progressEvent.total - progressEvent.loaded;
            const timeRemaining = Math.round(bytesRemaining / uploadSpeed); // in seconds
            setTimeRemaining(timeRemaining);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}
      <h1>Time:</h1>
      {timeRemaining > 0 && (
        <div>
          <p>Time remaining: {timeRemaining} seconds</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
