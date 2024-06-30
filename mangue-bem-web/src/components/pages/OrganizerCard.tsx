import React from 'react';

interface OrganizerCardProps {
  imageUrl: string;
  websiteUrl: string; 
}

const OrganizerCard: React.FC<OrganizerCardProps> = ({ imageUrl, websiteUrl }) => {
  const handleImageClick = () => {
    window.open(websiteUrl, '_blank'); 
  };

  return (
    <td align="center">
      <img
        style={{ width: '40%', borderRadius: '50%', cursor: 'pointer' }}
        src={imageUrl}
        onClick={handleImageClick} 
      />
      <br />
    </td>
  );
};

export default OrganizerCard;
