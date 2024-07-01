import React from 'react';

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  linkedinUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, name, linkedinUrl }) => {
  return (
    <td className='flex items-center flex-col'>
      <img className='w-[90px] rounded-full m-2' src={imageUrl} alt={name} />
      <br />
      <sub className='mb-5'><b>{name}</b></sub>
      <br />
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.shields.io/badge/-Linkedin-1C1C1C?style=for-the-badge&logo=Linkedin&logoColor=00FFFF"
          className='w-[90px] mb-2'
          alt="Linkedin Profile"
        />
      </a>
    </td>
  );
};

export default ProfileCard;
