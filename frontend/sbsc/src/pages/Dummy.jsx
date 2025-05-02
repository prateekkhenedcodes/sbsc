import React, { useEffect, useState } from 'react';

function Dummy() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8080/ping')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Error fetching ping'));
  }, []);

  // Inline styles for visibility
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    background: '#f0f4f8',
    borderRadius: '12px',
    margin: '40px auto',
    width: '60%',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
  };

  const h2s = {
    color : 'black'
  }

  const messageStyle = {
    fontSize: '2rem',
    color: '#1565c0',
    fontWeight: 'bold',
    marginTop: '16px',
    letterSpacing: '2px'
  };

  return (
    <div style={containerStyle}>
      <h2 style = {h2s}>Dummy Page</h2>
      <div style={messageStyle}>{message}</div>
    </div>
  );
}

export default Dummy;
