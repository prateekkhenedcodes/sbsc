import { useState } from 'react';
import './Upload.css';

export default function Upload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Upload successful!');
        setName('');
        setDescription('');
        setImage(null);
      } else {
        alert('Upload failed.');
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}