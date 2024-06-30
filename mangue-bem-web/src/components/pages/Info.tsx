import React from 'react';
import ProfileCard from './ProfileCard'; 
import OrganizerCard from './OrganizerCard'; 
import './info.css'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Info: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true, 
    centerPadding: '0', 
  };
  return (
    <div className="info-container">
      <section className="info-section">
        <h2>Sobre o Projeto</h2>
        <p>
         Bem-vindo ao Sistema de Gerenciamento de Cogumelos Comestíveis Brasileiros! Este projeto tem como objetivo criar uma aplicação web para gerenciar e controlar o projeto "Brazilian Edible Mushrooms".
        Trata-se de um sistema web com vários perfis de usuários, cada um concedendo acesso a diferentes funcionalidades. 
        </p>
        <p>
        As funcionalidades principais incluem a busca por espécies específicas de cogumelos comestíveis, além de uma visão geral dos Cogumelos Comestíveis no Brasil.
        Os visitantes também podem solicitar o registro de novas espécies, sujeitas à curadoria de especialistas.
        A interface é projetada para ser responsiva e visualmente atraente.
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

      <div className="info-container">
      <section className="info-section">
        <h2>Biografia</h2>
        <br />
        <Slider {...settings}>
          <div>
            <OrganizerCard
              imageUrl="assets/Mariana.jpg"
              websiteUrl="https://integra.ifsp.edu.br/portfolio/laboratorios/ifungilab-campus-sao-paulo"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Mariana P. Drewinski.
              </p>
              <p>
              PhD in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), is a mycologist and has experience in systematics of macrofungi and mushroom production. 
              Her research topics include the diversity of wild edible mushrooms in Brazil, mainly from the Atlantic Rainforest, and the cultivation potential of wild strains. 
              Mariana is also interested in fungal conservation and science outreach.
              </p>
            </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Marina Pires.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Marina Pires Corrêa-Santos.
              </p>
              <p>
              Msc in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), is a mycologist and has experience in mushroom domestication. 
              She researches the cultivation factors of wild edible mushrooms in Brazil, mainly from the Atlantic Forest.
              Her master's study focused on the diversity and cultivation factors of wild strains of the genus Lentinus.              </p>
            </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Vitor X.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Vitor X. Lima 
              </p>
              <p>
              PhD in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), has experience in taxonomy and systematics of myxomycetes, dictyostelids and wood-inhabiting basidiomycetes from the Atlantic Forest, statistical ecology, biogeography and molecular phylogeny of these organisms. 
              Has also experience in prospecting wild edible fungi for ex situ cultivation, and ecology of soil and endophytic fungi.            
              </p>
               </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Felipe T.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Felipe T. Lima
              </p>
              <p>
              MSc in Agricultural Microbiology (Federal University of Viçosa, Viçosa, MG, Brazil), is a Forest Engineer (Rural Federal University of Pernambuco) which focuses its efforts on research and extension in the areas of forest microbiology, microorganism-plant interactions and forestry. Felipe is currently a collaborating researcher at Instituto de Pesquisas e Estudos Florestais (IPEF).
              </p>
               </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Melissa Palacio.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Melissa Palacio 
              </p>
              <p>
              PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil). She has experience in systematics and ecology of Neotropical macrofungi, especially polypores from the Atlantic Forest. Her latest studies focused on the diversity of the genus Polyporus. Melissa's other interests include evolution, biotechnology, fungal education and conservation.              </p>
               </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Maria Eduarda.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Maria Eduarda A. Borges  
              </p>
              <p>
              has a masters and is a PhD student in the Graduate Program in Biology of Fungi, Algae and Plants (Federal University of Santa Catarina, Florianópolis, SC, Brazil). She is interested in taxonomy, molecular phylogeny, and interactions of Agaricomycetes with emphasis in bioluminescent mushrooms, especially species of Mycena. Maria Eduarda is a member of the MICOLAB-UFSC and part of the TropicoEctomicorrizas project. She is an enthusiast of outreach and the person behind @coguquebrilha. She has experience in the field and her interests also include conservation of fungi and teaching mycology.            
              </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Larissa Trierveiler.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Larissa Trierveiler-Pereira   
              </p>
              <p>
              PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil) and currently a collaborator researcher at State University of Campinas. She has experience in systematics and ecology of Neotropical macrofungi, particularly basidiomycetes from the Atlantic Forest. Larissa also has experience in scientific outreach and science communication. She hosts an Instagram profile on edible mushrooms (@fancnacabeca), has published a book about the subject, and coordinates elective courses of science communication on mycology and edible mushrooms. Larissa is also interested in topics as: mycology education, ethnomycology, and mycophagy.              </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Altielys C.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Altielys C. Magnago   
              </p>
              <p>
              PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil). He has experience in systematics and ecology of Neotropical macrofungi, specially boletoid fungi from the Brazilian Atlantic Forest. He is also involved in societal activities concerning fungal diversity and scientific divulgation through social media, hosting an Instagram profile on fungal diversity (@fungacapixaba). His other interests include mycophagy and fungal education and conservation.           
                   </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Ariadne N..jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Ariadne N. M. Furtado    
              </p>
              <p>
              PhD in Biology of Fungi, Algae and Plants (Federal University of Santa Catarina, Florianópolis, SC, Brazil) and a member of the Brazilian Mycological Society and the South American Mycorrhizal Research Network, and a researcher at the TropicoEctomicorrizas project (UFSC-Brazil). She has experience in systematics of macrofungi, mainly Clavariaceae sensu lato, and diversity of Neotropical ectomycorrhizae.  Ariadne also has experience with protein structure modeling and molecular docking, and is currently a postdoctoral researcher (Federal University of Paraíba, Brazil). Ariadne is interested in how trait-based approaches predict mycorrhizal dispersal structure, and how MiSSPs influence structural modifications of ectomycorrhizal symbiosis by promoting, for example, root determinacy, which pathways are affected by fungal signaling, and how fungi contribute to hormonal imbalance in plants.
                  </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Alexandre R.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Alexandre R. Lenz     
              </p>
              <p>
              PhD in Biotechnology (University of Caxias do Sul, Caxias do Sul, RS, Brazil) with a Doctoral Exchange Program at the Universidad Nacional Autónoma de México, Yucatán (2020). He is Adjunct Professor in Information Systems at Campus I of the State University of Bahia, and Collaborating Professor in the Postgraduate Program in Pharmaceutical Sciences (PPGFARMA), in the Department of Life Sciences of Campus I of the State University of Bahia. Leader of the Bioinformatics and Computational Biology Research Group (G2BC - @g2bc.uneb): Fungal bioinformatics research line. He has experience in the area of bioinformatics, with an emphasis on genomics and gene regulation of fungi, working mainly on the following topics: (i) assembly and annotation of genomes; (ii) phylogenetic and evolutionary analyses; (iii) construction of gene regulatory networks; iv) prospecting for bioactive molecules from ascomycete and basidiomycete fungi and v) mycotourism.
                  </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Alexandre G.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Alexandre G. S. Silva-Filho     
              </p>
              <p>
              Msc in Botany and a PhD in Systematics and Evolution (Federal University of Rio Grande do Norte, Natal, RN, Brazil). His expertise is in Taxonomy, Systematics and Phylogeny of Agaricomycetes (Basidiomycota). Currently, he is a Postdoctoral researcher at IFungiLab, at the Federated Institute of Science, Education and Technology of São Paulo, where has been developing research with Taxonomy and Systematics of Mycenaceae from the Brazilian Atlantic Rainforest.
                   </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Cristiano Coelho.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Cristiano Coelho do Nascimento      
              </p>
              <p>
              is a nurse and biologist, Msc in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), PhD student in Plant Biodiversity and Environment (Institute of Botany, São Paulo, Brazil), professor at Federal Institute of Education, Science and Technology of Piauí (IFPI), Brazil. He is interested in taxonomy, molecular phylogeny, ethnomycology, and conservation of Agaricomycetes, as well as the cultivation of wild edible mushrooms. He is also involved in scientific outreach concerning fungal biology through the profile @IFungiLab on Instagram. 
                  </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Renato L.M.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Renato L.M. Alvarenga       
              </p>
              <p>
              PhD in Fungal Biology (Federal University of Pernambuco, Recife, PE, Brazil), has experience in taxonomy and systematics of jelly fungi (Auriculariales, Tremellales and Dacrymycetes) from the Amazon Forest, Atlantic Forest and Cerrado, statistical ecology, biogeography and molecular phylogeny of wood-inhabiting basidiomycetes. He also has experience in prospecting edible wild fungi for ex situ cultivation, biotechnology with an emphasis on bioactives with antimicrobial activity and enzyme production.
                </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Tatiana B.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Tatiana B. Gibertoni      
              </p>
              <p>
              PhD in Fungal Biology (Federal University of Pernambuco Recife, PE, Brazil) and in Experimental Ecology and Geobotany (Università degli Studi di Pavia, Italy) and currently full professor at Federal University of Pernambuco, vice-coordinator of the Fungal Biology Post-Graduate Program (Federal University of Pernambuco) and vice-curator of Herbarium URM. She is interested in taxonomy, systematics, conservation of Agaricomycetes, as well as the sustainable use of these fungi as food, in bioremediation and in pharmaceutics. She is also involved in societal activities concerning fungal diversity and scientific divulgation through social media.
                 </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Jadson J.S.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Jadson J.S. Oliveira       
              </p>
              <p>
              PhD in Plant Biodiversity and the Environment (Environmental Research Institute, São Paulo, SP, Brazil). He has experience in Botany and Mycology, especially in taxonomy and phylogeny of Fungi (basidiomycetes), mycelium cultivation, genetics and evolution of Agaricales. He has a postdoctoral degree from the Royal Ontario Museum, Toronto, Canada, in Phylogenomics using Exome Target Sequencing in Agaricales, and from the National Institute for Amazon Research (INPA), Manaus, AM, with a taxonomy and systematics research project on the suborder Marasmiineae in areas of the central Amazon.
                  </p>
              </div>
          </div>

          <div>
            <OrganizerCard
              imageUrl="assets/Juliano M.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Juliano M. Baltazar      
              </p>
              <p>
              PhD in Botany (Federal University of Rio Grande do Sul, Porto Alegre, RS, Brazil) and professor at the Federal University of São Carlos. He has experience in systematics and ecology of Neotropical macrofungi, especially corticioid fungi and polypores from the Atlantic Forest. Juliano is also interested in ethnomycology, mycophagy, edible fungi, mycology education and education as general.
                  </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Maria Alice.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Maria Alice Neves       
              </p>
              <p>
              has a PhD in Plant Sciences through The New York Botanical Garden and CUNY. She is a professor at the Federal University of Santa Catarina and the graduate program in Biology of Fungi, Algae and Plants, coordinator of the MICOLAB-UFSC, and curator of the Fungarium FLOR. Maria-Alice has experience in mushroom taxonomy and ectomycorrhizal interactions and is the founder of the TropicoEctomicorrizas project. She started the Rick Foray in 2010, an outreach activity to get people interested in mycology and natural history. Her other interests include fungal education and conservation and scientific embroidery.
                  </p>
              </div>
          </div>
          
          <div>
            <OrganizerCard
              imageUrl="assets/Ruby Vargas.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Ruby Vargas-Isla       
              </p>
              <p>
              PhD in Botany (National Amazon Research Institute, INPA, Manaus, AM, Brazil). She currently participates in the Amazon Mushrooms Research Group projects of the INPA and has a start-up carrying out environmental consulting and spawn production of native mushroom species in the Amazonas Organic Production Center. She chose to study fungi with emphasis on edible native mushrooms to the Amazon, ethnomycology, fungiculture and mycotourism. In addition to articles, she writes booklets and technical-scientific guides and books about mushrooms and is published in indigenous and non-indigenous languages.
                  </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Noemia .jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Noemia K. Ishikawa      
              </p>
              <p>
              PhD in Environmental Resources from Hokkaido University, Japan. She is a researcher at the National Amazon Research Institute, Manaus, AM, Brazil. She leads the Amazon Mushrooms Research Group since 2007. Coordinates projects about fungiculture, mycotourism, ethnomycology and popularization of mycology in the Amazon. In addition to articles and scientific books about mushrooms, she writes children's books, published in indigenous and non-indigenous languages.
                </p>
              </div>
          </div>


          <div>
            <OrganizerCard
              imageUrl="assets/Nelson.jpg"
              websiteUrl="https://portal.uneb.br/"
            />
            <div style={{ marginLeft: '20px' }}>
              <p>
              Nelson Menolli Jr      
              </p>
              <p>
              is biologist, Doctor in Plant Biodiversity and Environment (Environmental Research Institute, São Paulo, SP, Brazil), full professor at Federal Institute of Education, Science and Technology of São Paulo (IFSP), Brazil, coordinator of the IFungiLab and curator of the fungarium FIFUNGI at the same institution. Nelson has experience in taxonomy, conservation and molecular phylogeny of mushroom-forming fungi and cultivation of wild edible mushrooms. As an initiative of scientific outreach and science communication, Nelson coordinates the profile @IFungiLab on Instagram.
                  </p>
              </div>
          </div>


        </Slider>
      </section>
    </div>

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
              <div style={{ marginLeft: '20px' }}> {}
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
              <div style={{ marginLeft: '20px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
              <div style={{ marginLeft: '10px' }}> {}
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
          menollijr@yahoo.com.br / maridrewinski@gmail.com .
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