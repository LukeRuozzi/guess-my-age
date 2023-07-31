import React, { useState, useEffect } from 'react';
import './style.css';
import { Form } from './Form';

export default function App() {
  const [name, setName] = useState('');

  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchName();
  }, []);

  const fetchName = () => {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((data) => {
        const name = data.results[0].name.first;
        //console.log(data.results[0]);
        setName(name);
      });
  };

  const handleSuccess = () => {
    setStatus('ok');
  };

  const handleFail = () => {
    setStatus('ko');
  };

  const handleReset = () => {
    setStatus('');
    fetchName();
  };

  const nameWrapperClass = `name-wrapper ${
    status === 'ok'
      ? 'name-wrapper-valid'
      : status === 'ko'
      ? 'name-wrapper-fail'
      : ''
  }`;

  return (
    <div className="main-container">
      <h1 className="title">Guess my age</h1>
      {name && (
        <>
          <div className={nameWrapperClass}>
            <h3>My name is...</h3>
            <p>{name}</p>
          </div>

          <Form
            name={name}
            onSuccess={handleSuccess}
            onFail={handleFail}
            onReset={handleReset}
          />
        </>
      )}
    </div>
  );
}
