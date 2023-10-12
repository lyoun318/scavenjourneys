import React, { useEffect, useState } from 'react';
import axios from 'axios';

import StepForm from './StepForm.tsx';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

  const CreateJourney: React.FC = () => {
  const [journeyData, setJourneyData] = useState({
    name: '',
    description: '',
    img_url: '',
    //import from home
    latitude: '',
    longitude: ''
  });

  const [journeyId, setJourneyId] = useState(null);

  const [image, setImage] = useState<string | null>('');
  //const [video, setVideo] = useState<HTMLVideoElement | null>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value });
  };

  //for webcam access
  // useEffect(() => {

  //   const video = document.getElementById('video') as HTMLVideoElement;
  //   setVideo(video)

  //   if(navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({video: true})
  //     .then((stream) => {
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //   }
  // }, [])

  // const takePicture = async() => {
  //   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  //   const context = canvas.getContext('2d');
  //   context.drawImage(video, 0, 0, 320, 240)
  // }

  const createJourney = async () => {
    try {
      const journeyResponse = await axios.post('/journey', journeyData);
      const newJourney = journeyResponse.data;
      setJourneyId(newJourney.id);
      navigate(`/StepForm/${newJourney.id}`);
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };

  const navigate = useNavigate();

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    let imgSrc = URL.createObjectURL(files[0])
    setImage(imgSrc);
    setJourneyData({ ...journeyData, img_url: imgSrc.slice(5)});
  }


  return (
    <Paper>
      <h2>Create a New Journey</h2>
      <TextField
        label="Name"
        type="text"
        name="name"
        value={journeyData.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Description"
        type="text"
        name="description"
        value={journeyData.description}
        onChange={handleInputChange}
      />
        {/* <video id="video" width="320" height="240"></video>
        <button
          id="snap"
          onClick={takePicture}
        >Snap Photo</button>
        <canvas id="canvas" width="320" height="240"></canvas> */}
        <input
          id="cameraInput"
          type="file"
          accept="image/*"
          capture
          onChange={(e) => saveImage(e)}/>
        <img
          src={image} />
        {!journeyId ? (
          <Button onClick={createJourney}>Add Steps</Button>
        ) : null}
    </Paper>
  );
};

export default CreateJourney;