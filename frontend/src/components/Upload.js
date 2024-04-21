import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import uploadImg from '../Assets/Images/cloud-upload.svg';

const StudentList = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [trainer, setTrainer] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  // const handleTrainerChange = (event) => {
  //   setTrainer(event.target.value);
  // };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setIsLoading(true);  // Set loading state to true  

      let uploadData = {
        name: name,
        description: description,
        trainer: user.fname,
        trainerEmail:user.email,
        difficulty: difficulty,
        thumbnail: thumbnail,
        video: video,
      };
      console.log(uploadData);

      await axios.post('http://lmspwc.eastus.cloudapp.azure.com:5000/courses/create', uploadData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const _id = response.data._id;
        let formData = new FormData();
        formData.append(`thumbnail`, thumbnail);
        formData.append(`video`, video);
        formData.append(`courseId`, _id);
        await axios.post('http://lmspwc.eastus.cloudapp.azure.com:5000/students/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        //logic to first get current trainer data, then add _id in its list of myCouses, then patch(update) trainer data
        setIsUploaded(true);
        console.log('File uploaded successfully.');
      });
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false); // Set loading state to false  
    }
  };

  return (
    <div className="upload-container">
      {isUploaded ? (
        <>
          <h2>File uploaded successfully.</h2>
          <button onClick={() => window.location.href = '/course'}>Go back to Course Page</button>
        </>
      ) : (
        <>
          <h2>
            <img src={uploadImg} alt="Upload Icon" className="upload-icon" /> Upload File
          </h2>

          <form>
            <div className="form-group">
              <label htmlFor="name">Course Name</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>

            <div className="form-group">
              <label htmlFor="description">Course Description</label>
              <textarea id="description" value={description} onChange={handleDescriptionChange} />
            </div>
            {/* <div className="form-group">
              <label htmlFor="trainer">Trainer Name</label>
              <input type="text" id="trainer" value={trainer} onChange={handleTrainerChange} />
            </div> */}

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
                <option value="">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Course Thumbnail</label>
              <input type="file" id="thumbnail" onChange={handleThumbnailChange} />
            </div>

            <div className="form-group">
              <label htmlFor="video">Course Video</label>
              <input type="file" id="video" onChange={handleVideoChange} />
            </div>

            {/* <button type="button" onClick={handleFileUpload}>Upload</button> */}
           
            <button type="button" onClick={handleFileUpload} disabled={isLoading}>Upload</button>
            {isLoading && <p>Uploading...</p>}
          </form>
        </>
      )}
    </div>
  );
};
export default StudentList;  
