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
    <td align="center" className='w-fit h-fit pl-5'>
      <img
      className='w-[150px] h-[150px] rounded-full cursor-pointer bg-white'
        src={imageUrl}
        onClick={handleImageClick} 
      />
      <br />
    </td>
  );
};

export default OrganizerCard;
