import React from 'react';
import styled from 'styled-components';
import meetUpImage from '../assets/meetUp.png';

const MeetUpContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #3A4374;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const MeetUpImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Description = styled.div`
  margin-top: 30px;
  line-height: 1.6;
  color: #333;
`;

const MeetUp = () => {
  return (
    <MeetUpContainer>
      <Title>MEET UP POINTS</Title>
      
      <ImageContainer>
        <MeetUpImage src={meetUpImage} alt="Meet Up Points Map" />
      </ImageContainer>
      
      <Description>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sed vitae donec auctor vitae arcu. Pellentesque diam consequat nunc morbi aliquam 
          facilisis vitae posuere. Malesuada sit donec blandit nibh consectetur mauris. Lectus amet eleifend eget condimentum. Enim 
          dui lorem ullamcorper libero. Feugiat proin sem diam at feugiat. Senectus aliquam est congue nunc adipiscing. Sem pharetra 
          vulputate augue est nec. Lorem at scelerisque faucibus tincidunt suspendisse felis facilisi mauris. Consequat urna cursus 
          pharetra sit turpis ullamcorper tincidunt mattis duis. Lobortis pharetra odio gravida risus ut at nisl tempor non. Pharetra dictum 
          est tortor nulla sit quis. Eget fermentum bibendum habitant et facilisis hendrerit enim egestas. Fusce aliquam in euismod 
          lorem volutpat mauris viverra malesuada.
        </p>
        <p>
          Eu eu auctor in interdum elit quam proin nec vel. Amet elit consequat iaculis urna. Odio eu ac elit et id interdum ornare nunc 
          eget. Pharetra habitant eget lorem arcu hendrerit varius etiam. Nisl morbi amet faucibus at eu bibendum rhoncus posuere.
        </p>
      </Description>
    </MeetUpContainer>
  );
};

export default MeetUp; 