import React from 'react';
import ProfileCard from './ProfileCard'; 
import OrganizerCard from './OrganizerCard'; 
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
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxp7SkVO6ROHK8ZHQQNeAO2c9gUtFWCWDaG6EIqUT70g&s"
                name="Maiana Oliveira"
                linkedinUrl="https://www.linkedin.com/in/maianaoliv/"
                />
            </tr>
          </tbody>
        </table>
      </section>

      <section className="info-section">
        <h2>Organizadores</h2>
        <h1>Over 400 food resources from Brazil: evidence-based records of wild edible mushrooms </h1>  
        <br />
        <table>
          <tbody>

            <tr>
              <OrganizerCard
                imageUrl="assets/ifungi.jpg"
                websiteUrl="https://integra.ifsp.edu.br/portfolio/laboratorios/ifungilab-campus-sao-paulo"
              />
              <div style={{ marginLeft: '20px' }}> {/* Espaçamento para o texto */}
                <p>
                FungiLab, Subárea de Biologia, Departamento de Ciências da Natureza e Matemática, 
                Instituto Federal de Educação, Ciência e Tecnologia.
                
                </p>
                <p>
                São Paulo, Câmpus São Paulo, Rua Pedro Vicente 625, 01109-010, São Paulo, SP, Brazil.
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/uneb.png"
                websiteUrl="https://portal.uneb.br/"
              />
              <div style={{ marginLeft: '20px' }}> {/* Espaçamento para o texto */}
                <p>
                Grupo de Pesquisa em Bioinformática e Biologia Computacional (G2BC).
                </p>
                <p>
                Departamento de Ciências Exatas e da Terra, Universidade do Estado da Bahia, Campus I, Salvador, BA, Brazil.
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/INPA colorido.png"
                websiteUrl="https://portal.uneb.br/"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Grupo de Pesquisa Cogumelos da Amazônia, Coordenação de Biodiversidade (COBIO), Instituto Nacional de Pesquisas da Amazônia (INPA). 

                </p>
                <p>
                Av. André Araújo, 2936, 69067-375, Petrópolis, Manaus, AM, Brazil.                
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/uefs.png"
                websiteUrl="https://biologiavegetal.ufes.br//"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Departamento de Botânica, Universidade Federal do Espírito Santo (UFES).
                </p>
                <p>
                Av. Fernando Ferrari, 514, 29075-910, Vitória, ES, Brazil.               
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/ufpb.png"
                websiteUrl="https://www.ufpb.br/dbm/contents/laboratorios/laboratorio-de-genetica-evolutiva-lemisk"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Laboratório de Genética Evolutiva Paulo Leminski, Departamento de Biologia Molecular, (CCEN). 
                </p>
                <p>
                Universidade Federal da Paraíba, Cidade Universitária, 58051-900, João Pessoa, PB, Brazil.                  
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/ufpe.png"
                websiteUrl="https://www.ufpe.br/cb"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Centro de Biociências (CB), Departamento de Micologia, Universidade Federal de Pernambuco (UFPE).
                </p>
                <p>
                Avenida da Engenharia, S/N 50740-600 – Cidade Universitária, Recife, PE, Brazil.                
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/ufsc.png"
                websiteUrl="https://bot.ccb.ufsc.br/"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Programa de Pós-graduação em Biologia de Fungos, Algas e Plantas, Laboratório de Micologia (MICOLAB-UFSC), 
                Departamento de Botânica, Centro de Ciências Biológicas, Universidade Federal de Santa Catarina, 
                Campus Universitário Reitor João David Ferreira Lima.
                </p>
                <p>
                , s/nº, 88040-900, Florianópolis, SC, Brazil.               
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/ufrgs.png"
                websiteUrl="https://www.ufrgs.br/biociencias/laboratorios/"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Laboratório de Micologia, Departamento de Botânica, Instituto de Biociências, Universidade Federal do Rio Grande do Sul. 

                </p>
                <p>
                Av. Bento Gonçalves 9500, Prédio 43.433, 91501-970, Campus do Vale, Agronomia, Porto Alegre, RS, Brazil.           
                </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/logo-ufscar.png"
                websiteUrl="https://www.lemic.ufsc.br/"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Laboratório de Estudos Micológicos (LEMic-UFSCar), Centro de Ciências da Natureza, Universidade Federal de São Carlos, Campus Lagoa do Sino. 
                </p>
                <p>
                Buri, SP, Brazil. </p>
              </div>
            </tr>

            <tr>
              <OrganizerCard
                imageUrl="assets/ifsp.png"
                websiteUrl="https://www.ifsp.edu.br/"
              />
              <div style={{ marginLeft: '10px' }}> {/* Espaçamento para o texto */}
                <p>
                Núcleo de Pós-graduação Stricto Sensu, Pós-graduação em Biodiversidade Vegetal e Meio Ambiente, Instituto de Pesquisas Ambientai.
                </p>
                <p>
                Av. Miguel Stefano 3687, 04301-012, Água Funda, São Paulo, SP, Brazil. </p>
              </div>
            </tr>


          </tbody>
        </table>
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
    </div>
    
  );
};

export default Info;