import React from 'react';

export default function GoKiteFooter() {
  return (
    <footer style={{
      backgroundColor: '#D7F7FF',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderTop: '2px solid #A1CED7'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '40px'
      }}>
        {/* Left Section - Logo Image and Contact Info */}
        <div style={{
          flex: '1 1 280px',
          minWidth: '280px',
          maxWidth: '350px',
        }}>
          {/* Logo Image */}
          <img 
            src="/img/general/logo.svg" 
            alt="Go Kite Logo" 
            style={{
              width: '120px',
              height: 'auto',
              marginBottom: '20px',
              maxWidth: '100%',
            }}
          />

          {/* Contact Info */}
          <div style={{ color: '#222', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>Contact our Travel agent</p>
            <p style={{ margin: '0 0 8px 0' }}>Monday-Friday (9Am-5Pm)</p>
            <p style={{ margin: '0 0 8px 0' }}>+91 7620370639</p>
            <p style={{ margin: '0 0 20px 0' }}>Email : Support@gokite.com</p>
          </div>

          {/* Social Media Icons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} style={{
                width: '35px',
                height: '35px',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '2px solid #A1CED7'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#A1CED7',
                  borderRadius: '2px'
                }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Our Services */}
        <div style={{
          flex: '1 1 180px',
          minWidth: '180px',
          maxWidth: '250px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#222',
            marginBottom: '20px'
          }}>Our Services</h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}>
            {['Flight Booking', 'Visa', 'Activities', 'Holidays', 'Hotel'].map((service, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  color: '#222',
                  textDecoration: 'none',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - About */}
        <div style={{
          flex: '1 1 180px',
          minWidth: '180px',
          maxWidth: '250px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#222',
            marginBottom: '20px'
          }}>About</h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}>
            {['Account', 'About Us', 'Support', 'Help Desk', 'Terms & Condition'].map((item, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  color: '#222',
                  textDecoration: 'none',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
