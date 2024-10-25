import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <h2 style={styles.heading}>UMAR RAFIQUE</h2>
      <div style={styles.segments}>
        <div style={styles.segment}>
          <h4>Segment 1</h4>
          <ul style={styles.linkList}>
            <li><a href="#link1" style={styles.link}>Link 1</a></li>
            <li><a href="#link2" style={styles.link}>Link 2</a></li>
            <li><a href="#link3" style={styles.link}>Link 3</a></li>
          </ul>
        </div>
        <div style={styles.segment}>
          <h4>Segment 2</h4>
          <ul style={styles.linkList}>
            <li><a href="#link4" style={styles.link}>Link 4</a></li>
            <li><a href="#link5" style={styles.link}>Link 5</a></li>
            <li><a href="#link6" style={styles.link}>Link 6</a></li>
          </ul>
        </div>
        <div style={styles.segment}>
          <h4>Segment 3</h4>
          <ul style={styles.linkList}>
            <li><a href="#link7" style={styles.link}>Link 7</a></li>
            <li><a href="#link8" style={styles.link}>Link 8</a></li>
            <li><a href="#link9" style={styles.link}>Link 9</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '20px',
    backgroundColor: '#000',  // Changed to black
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  segments: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  segment: {
    textAlign: 'left',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block',
  },
};

export default Footer;
