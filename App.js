import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (qId, answer) => {
    setAnswers({ ...answers, [qId]: answer });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/submit', { user_id: 1, answers })
      .then(res => alert(res.data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Online Exam</h1>
      {questions.map(q => (
        <div key={q.id}>
          <p>{q.question}</p>
          {q.options.map((opt, index) => (
            <button key={index} onClick={() => handleSelect(q.id, opt)}>
              {opt}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
import * as blazeface from '@tensorflow-models/blazeface';

async function detectFace() {
  const model = await blazeface.load();
  const video = document.querySelector('video');
  const faces = await model.estimateFaces(video);
  console.log(faces.length ? 'Face detected' : 'No face detected!');
}

setInterval(detectFace, 5000); // Check every 5 seconds
