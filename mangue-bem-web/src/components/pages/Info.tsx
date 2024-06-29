import React from 'react';
import ProfileCard from './components/ProfileCard.tsx'; 
import './info.css'; 

const Info: React.FC = () => {
  return (
    <div className="info-container">
      <section className="info-section">
        <h2>Sobre o Projeto</h2>
        <p>
          Este é um exemplo de uma página de informações gerais. Aqui você pode
          fornecer detalhes sobre o projeto, seu propósito e qualquer outra
          informação relevante.
        </p>
      </section>

      <section className="info-section">
        <h2>Contato</h2>
        <p>
          Para entrar em contato conosco, você pode enviar um e-mail para
          contato@exemplo.com ou ligar para (11) 1234-5678.
        </p>
      </section>

      <section className="info-section">
        <h2>Ajuda</h2>
        <p>
          Se precisar de ajuda, visite nossa seção de Perguntas Frequentes ou
          entre em contato com nosso suporte técnico.
        </p>
      </section>

      <section className="info-section">
        <h2>Equipe</h2>
        <table>
          <tbody>
            <tr>
              <ProfileCard
                imageUrl="https://media.licdn.com/dms/image/D4D03AQEzapF3BpAyJA/profile-displayphoto-shrink_400_400/0/1695242605934?e=1722470400&v=beta&t=FF8SS3uuREQx-AtRKzotuMJRso4pMGO1kgIN4lJMw2k"
                name="Daniel Galdino"
                linkedinUrl="https://www.linkedin.com/in/daniel-galdino-b225b01a0/"
              />
              <ProfileCard
                imageUrl="https://media.licdn.com/dms/image/D4D03AQHmwJgqrSdPIw/profile-displayphoto-shrink_400_400/0/1668289132010?e=1722470400&v=beta&t=PO99CgBKVGz4Zr-OdF-PVj7TTvwe4gpXApby7tr03LA"
                name="Eduardo Correia"
                linkedinUrl="https://www.linkedin.com/in/correiaeduardojr/"
              />
              <ProfileCard
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxp7SkVO6ROHK8ZHQQNeAO2c9gUtFWCWDaG6EIqUT70g&s"
                name="Gleidson Jonas"
                linkedinUrl="https://www.linkedin.com/in/"
              />
              <ProfileCard
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxp7SkVO6ROHK8ZHQQNeAO2c9gUtFWCWDaG6EIqUT70g&s"
                name="Guilherme França"
                linkedinUrl="https://www.linkedin.com/in/"
              />
              <ProfileCard
                imageUrl="https://media.licdn.com/dms/image/D4D03AQGUKiPrtNaQ4Q/profile-displayphoto-shrink_400_400/0/1689463711292?e=1722470400&v=beta&t=_WhbVZrq-CDYiDCg05NwIO9KDPlHMc0AgVfZBZ2HOCU"
                name="João Vítor Café"
                linkedinUrl="https://www.linkedin.com/in/joaovitorcafe/"
              />
              <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/69278952?v=4"
                name="Kyara Cardozo"
                linkedinUrl="https://www.linkedin.com/in/kyara-cardozo/"
              />
              <ProfileCard
                imageUrl="https://media.licdn.com/dms/image/D4D03AQHiLBB6-YkaXg/profile-displayphoto-shrink_400_400/0/1715309318764?e=1722470400&v=beta&t=ZoqjybeaCV5UdUiszVHVEJ3UV1NTIg3v4ZqI-B0gpbY"
                name="Maiana Oliveira"
                linkedinUrl="https://www.linkedin.com/in/maianaoliv/"
              />
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Info;
