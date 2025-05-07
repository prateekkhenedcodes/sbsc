import { useState } from 'react';
import './Upload.css';

export default function Upload() {
  const [name, setName] = useState('');
  const [passoutYear, setPassoutYear] = useState('');
  const [gender, setGender] = useState('');
  const [branch, setBranch] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = JSON.stringify({
      name,
      passout_year: parseInt(passoutYear),
      gender,
      branch,
      description
    });

    const formData = new FormData();
    formData.append('image', image);
    formData.append('data', jsonData);

    try {
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert('Upload successful!\n' + result.message);
        console.log(result);
        setName('');
        setPassoutYear('');
        setGender('');
        setBranch('');
        setDescription('');
        setImage(null);
      } else {
        const err = await response.text();
        alert('Upload failed: ' + err);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Submit Your Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Passout Year:</label>
          <select value={passoutYear} onChange={e => setPassoutYear(e.target.value)} required>
            <option value="">Select Year</option>
            {[2024, 2025, 2026, 2027, 2028].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <input type="text" value={branch} onChange={e => setBranch(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
