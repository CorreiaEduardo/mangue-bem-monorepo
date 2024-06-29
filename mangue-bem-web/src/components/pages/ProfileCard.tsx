import React from 'react';

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  linkedinUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, name, linkedinUrl }) => {
  return (
    <td align="center">
      <img style={{ width: '70%', borderRadius: '50%' }} src={imageUrl} alt={name} />
      <br />
      <sub><b>{name}</b></sub>
      <br />
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.shields.io/badge/-Linkedin-1C1C1C?style=for-the-badge&logo=Linkedin&logoColor=00FFFF"
          style={{ width: '90px' }}
          alt="Linkedin Profile Picture"
        />
      </a>
    </td>
  );
};

export default ProfileCard;
