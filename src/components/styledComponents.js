
import styled from "styled-components";
import background from '../assets/background.png';
import ImageSelectBox from '../assets/ImageSelectBox2.png';

export const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  /* background-image: url(${background}); */
  background-size:cover;
  background-color:#FBF6D5;
  @media (min-width: 800px) {
    width: 600px;
    padding-bottom:200px;
    height: auto;
  }
  
  /* position:relative; */
  @media (max-height: 800px) {
    padding-bottom:120px;
  }
  @media (max-height: 700px) {
    padding-bottom:140px;
  }
   


`;

export const BgImg=styled.img`
    width:30%;
    height:40%;
    padding-bottom:1px;
`;


export const TopImage=styled.img`
    width:20%;
`;


export const Btn=styled.button`
   background-color:#AF846D;
   width:150px;
   padding:10px 10px;
   border-radius:10px;
   color:white;
   font-size:20px;
   font-weight:800;
   margin-top:50px;
   border-width:0px;
   text-align:center;
`;

export const ImageContainer=styled.div`
  width: 400px;
  height: 200px;
  display:flex;
  background-image: url(${ImageSelectBox});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  border-radius:10px;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  @media (min-width: 800px) {
    width: 400px;
    height: 300px;
    background-size:contain;
  }
`;

export const TopStart=styled.h1`
  white-space: pre-wrap;
  text-align:center;
  font-size:22px;
  font-weight:bold;   
  color:#9A7C67;
  margin-top:10%;
  @media (min-width: 800px) {
        font-size:40px;
    }
`;

export const ImageText=styled.h1`
  font-size:12px;
  font-weight:800;
  color:#979797;
  @media (min-width: 800px) {
        font-size:20px;
    }
`;

export const TopContainer=styled.div`
  width: 100%;
  background-color:#AF846D;
  padding:5px 5px;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
  flex-direction:column;
`;

export const TopTitle=styled.h1`
  font-size:25px;
  font-weight:normal;   
  color:white;
  margin-top:0px;
  margin-bottom:0px;
  letter-spacing:5px;
  @media (min-width: 800px) {
        font-size:35px;
    }
`;

export const TopSubTitle=styled(TopTitle)`
  font-size:18px;
  color:#C3B4AE;
  letter-spacing:3px;
  @media (min-width: 800px) {
        font-size:30px;
    }
`;

export const Title=styled(TopTitle)`
    color:#341f97;
    margin-top:10%;
`;

export const BottomContainer=styled.div`
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background-color:#F6F5F0;
  margin-top:5%;
  @media (min-width: 800px) {
    width: 100%;
    }
`;
export const BottomMainText=styled.h1`
      width:60%;
      font-size:15px;
      font-weight:bolder;   
      color:#B5A295;
      text-align: center;
      line-height: 1.64;
      @media (min-width: 800px) {
        font-size:25px;
    }
`;
export const BootomSubText=styled.h1`
     white-space:pre-wrap;
     letter-spacing:3px;
     width:80%;
     font-size:11px;
     font-weight:bolder;   
     color:#B5A295;
     text-align: center;
     line-height: 1.64;
     @media (min-width: 800px) {
        font-size:17px;
    }
`;