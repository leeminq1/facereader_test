import React from 'react'
import styled from "styled-components";
// import { render } from "react-dom";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import background from '../assets/background.png';


const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F6F4DA;
  background-image: url(${background});
  background-size:contain;
  background-position:center;
  flex-direction: column;
  position:relative;
  @media (min-width: 800px) {
    width: 600px;
    height: 100vh;
  }
`;

const MainTextContainer=styled.div`
  width:100%;
  /* background-color:#AF846D; */
  color:white;
  justify-content:center;
  align-items:center;
  padding:20px 0px;
  position:relative;
  bottom:11%;
  margin-top:5px;
  @media (min-height: 700px) {
    bottom:12%;
  }
  @media (min-width: 800px) {
    bottom:10%;
  }
  @media (min-height: 1000px) {
    bottom: 13%;
  }
`;


const MainText=styled.h1`
   text-align:center;
   color:white;
   font-size:20px;
   font-weight:normal;
   font-family:"nanum";
   margin-top:0px;
   margin-bottom:0px;
   letter-spacing:3px;
   position:relative;
   bottom:15%;
   @media (min-width: 800px) {
    font-size:20px;
  }
`;

const MainSubText=styled(MainText)`
   letter-spacing:1px;
   font-size:8px;
   font-weight:normal;
   margin-top:5px;
   margin-bottom:0px;
   position:relative;
   bottom:15%;
   @media (min-width: 800px) {
    font-size:15px;
  }


`

const LoadingContainer=styled.div`
    flex-direction:column;
    justify-content:flex-end;
    align-items:center;
    display:flex;
    position:relative;
    bottom: 40px;
`;

const BottomText=styled.h1`
   color:#C0B27F;
   font-size:20px;
   font-weight:normal;
   margin-top:15px;
  @media (min-width: 800px) {
    font-size:27px;
  }
`;

const Img=styled.img`
    width:100%;
    height:35%;
    position:relative;
    bottom:11%;
  @media (min-width: 800px) {
    bottom:10%;
  }
  @media (min-height: 700px) {
    height:35%;
    bottom:13%;
  }
  @media (min-height: 1000px) {
    bottom: 15%;
  }
    
`;

const LogoImg=styled.img`
    width:40px;
    height:40px;
    position:absolute;
    bottom:30px;
    /* object-fit: contain; */
    @media (min-width: 800px) {
      width:60px;
      height:60px;
  }
`;

export default function Loading() {
  return (
    <Container>
        <Img src={require('../assets/loading_top.png')}></Img>
        <MainTextContainer>
          <MainText>?????? ?????? ??? ??????????</MainText>
          <MainSubText>???????????? ????????? ?????? ?????????</MainSubText>
        </MainTextContainer>
        <LoadingContainer>
            <Spinner size={20} color="#BAAD7D"></Spinner>
            <BottomText>????????? ????????? ?????????</BottomText>
        </LoadingContainer>
        <LogoImg src={require('../assets/logo.png')}></LogoImg>
    </Container>
  )
}
