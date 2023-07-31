import React, { useState } from 'react';

export const Form = ({ name, onSuccess, onFail, onReset }) => {
  const [gender, setGender] = useState('male');

  const [age, setAge] = useState('');

  const [loading, setLoading] = useState(false);

  const onAgeChange = (e) => {
    //console.log(e.target.value);
    setAge(e.target.value);
  };

  const onGenderChange = (e) => {
    //console.log(e.target.value);
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(age, gender);
    if (gender && age) {
      setLoading(true);
      const validGender = await validateGender();
      const validAge = await validateAge();
      if (validGender && validAge) {
        onSuccess();
      } else {
        onFail();
      }
      setLoading(false);
    }
  };

  const validateGender = async () => {
    const url = `https://api.genderize.io?name=${name}`;
    const json = await fetch(url);
    const resp = await json.json();
    console.log(resp);

    if (gender == resp.gender && resp.probability > 0.5) {
      return true;
    }

    return false;
  };

  const validateAge = async () => {
    const url = `https://api.agify.io?name=${name}`;
    const json = await fetch(url);
    const resp = await json.json();
    console.log(resp);

    const tolerance = 5;

    if (age >= resp.age - tolerance && age <= resp.age + tolerance) {
      return true;
    }

    return false;
  };

  const handleReset = (e) => {
    e.preventDefault();
    setAge('');
    setGender('male');
    onReset();
  };

  return (
    <form className="form-wrapper">
      <div className="form-control">
        <label>Age</label>
        <input type="number" id="age" value={age} onChange={onAgeChange} />
      </div>
      <div className="form-control">
        <label>Gender</label>
        <select id="gender" value={gender} onChange={onGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        GUESS
      </button>
      <button
        type="submit"
        className="reset-btn"
        onClick={handleReset}
        disabled={loading}
      >
        RESET
      </button>
    </form>
  );
};
