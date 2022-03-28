import React, { useEffect } from "react";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoShareButton = styled.button`
   background-color:#FED16E;
   padding:10px 10px;
   border-radius:50px;
   color:#353535;
   font-size:15px;
   font-weight:bolder;
   border-width:0px;
   display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:row;
   @media (min-width: 800px) {
    font-size:20px;
    padding:10px 10px;
  }
`;

const KakaoShareBtn = ({name,checked}) => {

    useEffect(() => {
    createKakaoButton({name});

    if(checked){
      console.log("모델 : 남자모델",checked)
      console.log("얼굴형 :",name)
    }else{
      console.log("모델 : 여자모델",checked)
      console.log("얼굴형 :",name)
    }

  }, [name,checked]);


  const createKakaoButton = ({name,checked}) => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("75cc70b5dfd959a4becc6f0b44486dcf");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "내가 왕이될 상인가?",
          description: `내 얼굴형은 ${name}이네요! 결과를 확인하고 공유해보세요!`,
          imageUrl: checked?`https://facereader-test.web.app/shape/female/${name}.png`:`https://facereader-test.web.app/shape/male/${name}.png`,
          link: {
            mobileWebUrl: "https://facereader-test.web.app/",
            webUrl: "https://facereader-test.web.app/",
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
                mobileWebUrl: "https://facereader-test.web.app/",
                webUrl: "https://facereader-test.web.app/",
              },
          },
        ],
      });
    }
  };
  return (
    <KakaoShareButton id="kakao-link-btn">
        <RiKakaoTalkFill size={35} color="black"></RiKakaoTalkFill>
    </KakaoShareButton>
  );
};


export default KakaoShareBtn;