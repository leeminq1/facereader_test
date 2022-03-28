import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {Container,TopContainer,TopTitle,TopSubTitle,ImageContainer,TopStart,
    Btn,BottomContainer,BootomSubText} from "../components/styledComponents"


const Comment=styled.h1`
    white-space:pre-wrap;
    text-align:center;
    font-size:10px;
    font-weight:800;
    color:#b6b6b6;
    @media (min-width: 800px) {
        font-size:20px;
    }
  `;

const MiddleContainer=styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  width:100%;
`;


const Home = () => {
  return (
  <Container>
        <TopContainer>
            <TopTitle>내가 왕이 될 상인가?</TopTitle>
            <TopSubTitle>인공지능 얼굴형 관상 테스트</TopSubTitle>
        </TopContainer>
        <MiddleContainer >
          <TopStart>어서오시게 {"\n"} 관상은 처음인가?</TopStart>
          <ImageContainer>

              <>
              <Comment>업로드 된 사진은 별도로 {"\n"}수집, 보존하지 않고 
                      얼굴인식 용도에만 사용됩니다.</Comment>
              </>
          </ImageContainer>
          <Link to="/main">
                  <Btn>시작</Btn>
          </Link>
        </MiddleContainer>
        <BottomContainer>
            {/* <BottomMainText>얼굴인식 기술을 활용하여 나와 닮은 꼴 정치인을 찾아드립니다.</BottomMainText> */}
            <BootomSubText>관상(觀相)이란,{"\n"}
  
            얼굴로 사람의 성격과 기질을 파악하는 점(占)을 말합니다. 
            
            {"\n"}
            ‘내가 왕이 될 상인가?’는 사진을 업로드하면 인공지능이 사람마다 가진 고유의 얼굴 골격 타입을 분석해주고, 그에 맞는 관상 풀이를 해주는 인공지능 관상 테스트입니다.
            {"\n"}
            "사람의 얼궁에는 세상 삼라만상이 모두 다 들어있소이다!"
            {"\n"}
            -영화 관상中
            </BootomSubText>
        </BottomContainer>
        {/* <div className='adfit'></div> */}
      </Container>
  )
}

export default Home