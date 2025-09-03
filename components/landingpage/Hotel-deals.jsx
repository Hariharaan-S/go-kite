import React from 'react';
import { MapPin, Clock, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HotelDealsCards = () => {
  const hotelData = {
    name: "Wotel Calangute",
    location: "Goa, India",
    duration: "3 Days 2 Night",
    persons: "2 Person",
    price: "$328",
    rating: 4.7,
    reviews: 20,
    image: "/img/landingpage/hero.png"
  };

  const HotelCard = ({ className = "" }) => (
    <div style={{
      width: '320px',
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }} className={className}>
      {/* Image Container */}
      <div style={{ position: 'relative' }}>
        <img 
          src={hotelData.image}
          alt="Hotel Room"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          backgroundColor: '#ffffff',
          color: '#333333',
          fontSize: '12px',
          fontWeight: '600',
          padding: '6px 12px',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}>
          Featured
        </div>
      </div>

      {/* Content Container */}
      <div style={{ padding: '20px' }}>
        {/* Hotel Name */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0 0 8px 0',
          lineHeight: '1.3'
        }}>
          {hotelData.name}
        </h3>

        {/* Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <MapPin size={16} style={{ color: '#10b981', marginRight: '6px' }} />
          <span style={{
            fontSize: '14px',
            color: '#10b981',
            fontWeight: '500'
          }}>
            {hotelData.location}
          </span>
        </div>

        {/* Duration and Persons */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Clock size={16} style={{ color: '#6b7280', marginRight: '8px' }} />
            <span style={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              {hotelData.duration}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Users size={16} style={{ color: '#6b7280', marginRight: '8px' }} />
            <span style={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              {hotelData.persons}
            </span>
          </div>
        </div>

        {/* Price and Rating */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              From
            </span>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a1a1a'
            }}>
              {hotelData.price}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {hotelData.rating}
            </span>
            <span style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              ({hotelData.reviews} Reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        maxWidth: '1400px',
        margin: '0 auto 32px auto'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Hotel Deals
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
            color: '#6b7280',
            cursor: 'pointer',
            fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            View All
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <ChevronLeft size={20} style={{ color: '#ffffff' }} />
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <ChevronRight size={20} style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div style={{
        display: 'flex',
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
        overflowX: 'auto',
        paddingBottom: '20px'
      }}>
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div>
    </div>
  );
};

export default HotelDealsCards;