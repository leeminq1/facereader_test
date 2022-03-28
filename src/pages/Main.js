import React,{useState,useRef,useEffect} from 'react'
import * as tmImage from '@teachablemachine/image';
import styled from "styled-components";
import {Container,TopContainer,TopTitle,TopSubTitle,
  ImageText} from "../components/styledComponents"
import { MdIosShare } from "react-icons/md";
import {BsArrowCounterclockwise} from "react-icons/bs";
import { GrCheckmark } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import KakaoShareBtn from '../components/KakaoSharedBtn';
import Checkbox from "react-custom-checkbox";
import ImageSelectBox from '../assets/ImageSelectBox2.png';

import { Spinner } from "react-activity";
import "react-activity/dist/library.css";


const ImageUploadContainer=styled.input`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    display:none;
`;

const Image=styled.img`
    width:90%;
    height:200px;
    border-radius:10px;
`;

const Title=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#9A7C67;
  @media (min-width: 800px) {
    font-size:25px;
  }
`;

const MiddleContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:85%;
    margin-top:5%;

    @media (max-width: 400px) {
      width:95%;
  }
`;


const MainText=styled.h1`
    text-align: center;
    color: #8A6754;
    font-size:27px;
    font-weight:bolder;
    margin-top:0px;
    margin-bottom:10px;
    @media (min-width: 800px) {
      font-size:43px;
  }
`;

const SubText=styled.h1`
    text-align: left;
    color: #84817a;
    font-size:16px;
    font-weight:normal;
    margin-top:3px;
    margin-bottom:0px;
    line-height:22px;
    white-space:pre-wrap;
    /* font-family: "NanumMyeongjo"; */
    
    @media (min-width: 800px) {
      font-size:27px;
      line-height:30px;
  }
`;

const SubText2=styled(SubText)`
  color: #8A6754;
  font-size:15px;
  margin-top:3px;
  margin-bottom:3px;
  @media (min-width: 800px) {
        font-size:27px;
        line-height:30px;
    }
`;

const SubText3=styled(SubText)`
  color: #8A6754;
  font-size:17px;
  margin-top:3px;
  margin-bottom:15px;
  text-align:center;
  @media (min-width: 800px) {
        font-size:27px;
        line-height:30px;
    }
`;


const BottomContainer=styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  align-items:center;
  background-color:#FBF6D5;
  padding:5% 0%;
`;

const BottomBtn=styled.button`
   background-color:${pros=>pros.name==="share"?"#AF846D":"#2E2E2E"};
   padding:10px 10px;
   border-radius:${pros=>pros.name==="share"?"50px":"10px"};
   color:${pros=>pros.name==="share"?"#ffffff":"#ffffff"};
   font-size:15px;
   font-weight:bolder;
   border-width:0px;
   display:flex;
   justify-content:space-evenly;
   align-items:center;
   flex-direction:row;
   @media (min-width: 800px) {
    font-size:20px;
    padding:15px 15px;
  }
`;


const TopStartLoading=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#9A7C67;
  margin-top:3%;
  @media (min-width: 800px) {
    font-size:30px;
  }
`;

const TopStart=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#9A7C67;
  margin-top:3%;
  letter-spacing:12px;
  @media (min-width: 800px) {
    font-size:30px;
  }
`;

const CommentMsg=styled.h1`
  white-space:pre-wrap;
  font-size:13px;
  font-weight:bolder;
  color:#858585;
  width:80%;
  text-align:center;
  margin-top:5%;
  @media (min-width: 800px) {
    font-size:22px;
  }
`;

const BottomImg=styled.img`
    width:100%;
    /* height:30%; */
    object-fit: contain;
    margin-top:5%;
    @media (min-width: 800px) {
      height:27%;
  }
`;

const RestResultRow=styled.div`
  width:100%;
  display:flex;
  flex-direction:"row";
  justify-content:space-evenly;
  align-items:center;
  background-color:#FBF6D5;
`;

const RestResultCol=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`;

const ResultTitle=styled.div`
  background-color:#717171;
  color:white;
  border-radius:10px;
  padding:5px 10px;
`

const ResultBox=styled.div`
  padding:10px 10px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#FBFBE9;
  border-radius:6px;
  flex-direction:column;
`;

const ResultImage=styled.img`
  width: 100%;
  height: 80px;
  object-fit: fill;
`;

const ResultImage2=styled.img`
  width: 100%;
  height: 60px;
  object-fit: fill;
`;


const CheckBoxContainer=styled.div`
  display: flex;
  flex-direction:row;
  margin-bottom:5%;
`;

const Btn=styled.button`
   background-color:#AF846D;
   width:100px;
   padding:10px 10px;
   border-radius:10px;
   color:white;
   font-size:20px;
   border-width:0px;
   text-align:center;
`;


const FaceShape=styled.h1`
  margin:0px 0px;
  font-size:15px;
  color:#666666;
`;

export const ImageContainer=styled.div`
  width: 400px;
  height: ${props=>!props.IsImage?`200px`:`200px`};
  display:flex;
  background-image: url(${ImageSelectBox});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  /* background-color:rgba(0, 0, 0, 0.07); */
  border-radius:10px;
  /* border:3px dashed #535c68; */
  justify-content:center;
  align-items:center;
  /* box-shadow: 0px 3px 20px 10px rgba(0, 0, 0, 0.10); */
  flex-direction:column;
  @media (min-width: 800px) {
    /* width: 600px;
    height: 500px; */
    /* background-size:contain; */
    /* border-left:1px solid #95afc0;
    border-right:1px solid #95afc0; */
  }
`;

const SpinnerContainer=styled.div`
  padding-top:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`;


// const URL = 'https://teachablemachine.withgoogle.com/models/F1nMeBJwX/';
const URL_male = 'https://teachablemachine.withgoogle.com/models/UZi1AOjFU/';
const modelURL_male = URL_male + 'model.json';
const metadataURL_male = URL_male + 'metadata.json';

// const URL = 'https://teachablemachine.withgoogle.com/models/F1nMeBJwX/';
const URL_female = 'https://teachablemachine.withgoogle.com/models/aUxN81s1W/';
const modelURL_female = URL_female + 'model.json';
const metadataURL_female = URL_female + 'metadata.json';


let model


const Main = () => {
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  // const [imgFile, setImgFile] = useState(null);	//파일
  const [loading,setLoading]=useState(false);
  const [showResult,setShowResult]=useState(false);
  const [predictionArr,setPredictionArr]=useState([]);
  const [result,setResult]=useState(null);
  const [keyword,setKeyword]=useState(null);
  const [partnerShape,setPartnerShape]=useState(null);
  const [samePerson,setSamePerson]=useState(null);
  const [comment,setComment]=useState(null);
  const [checked,setChecked]=useState(false);

  const KakaoLoadOne=()=>{
    let ins = document.createElement('ins');
    let scr = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style = "display:none; width:100%;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '300');
    ins.setAttribute('data-ad-height', '250');
    ins.setAttribute('data-ad-unit', 'DAN-YnXOhNTOPLg5Lhdv');

    document.querySelector('.adfitOne').appendChild(ins);
    document.querySelector('.adfitOne').appendChild(scr);
  }

  const KakaoLoadTwo=()=>{
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
    ins.className = 'kakao_ad_area';
    ins.style = "display:none; width:100%;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '100');
    ins.setAttribute('data-ad-unit', 'DAN-fzUYytdvGyoHWHxz');

    document.querySelector('.adfitTwo').appendChild(ins);
    document.querySelector('.adfitTwo').appendChild(scr);

  }


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    KakaoLoadOne();
    return () => {
      document.body.removeChild(script);
    };
  }, [])

 

  async function init() {
    await console.log("init 실행")
    // if(checked){
    //   console.log("남자모델 불러옴")
    //   model = await tmImage.load(modelURL, metadataURL);
    // }else{
    //   console.log("여자모델 불러옴")
    //   model = await tmImage.load(modelURL, metadataURL);
    // }
    
    // model = await tmImage.load(modelURL, metadataURL);
    // //총 클래스 수
    // let maxPredictions;
    // maxPredictions = model.getTotalClasses();
}

  async function predict(checked) {
    // predict can take in an image, video or canvas html element
    if(checked){
      console.log("남자모델 불러옴")
      model = await tmImage.load(modelURL_male, metadataURL_male);
    }else{
      console.log("여자모델 불러옴")
      model = await tmImage.load(modelURL_female, metadataURL_female);
    }
    const tempImage = document.getElementById('srcImg');
    const prediction = await model.predict(tempImage, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    setPredictionArr(prediction)
    setShowResult(true)
    setLoading(false)
    setResult(prediction[0].className)
    if(checked){
      console.log("남자모델 해석")
      switch(prediction[0].className){
        case "둥근형":
          setKeyword(`얼굴이 전체적으로 모나지 않고 둥그런 모양을 둥근형 얼굴이라고 합니다.이런 얼굴을 지닌 남성은 살집이 좋고 탄력이 있으며 성품이 원만하고 낙천적입니다. 또한 추진력과 통솔력이 뛰어나 경제능력이 탁월하지요. ${"\n"}단, 개성이 적은 편이라 학술이나 학예 방면보다는 행정관청 계통에 종사하는 것이 더 적합합니다. 애정 면에서는 가끔 다른 이성에게 한눈을 팔아 고심하게 될 수도 잇습니다. ${"\n"}말년에 혈압 계통의 질환을 앓을 수 있으니 항시 조심해야 합니다.`);
          setPartnerShape(`역삼각형`)
          setSamePerson(`정형돈, 강호동, 김대명, 송중기`)
          setComment(`얼굴형만큼 성품도 ${"\n"}낙천적이며 원만한 타입`)
          break;
        case "직사각형":
          setKeyword(`얼굴이 직사각형을 세워 놓은 것처럼 좁은 모양을 직사각형 얼굴이라고 합니다. 이런 얼굴을 지닌 남성은 감정이 예민하고 총명하며 매사가 빈틈 없기 때문에 교육계나 의사, 컴퓨터 산업 등에 종사하면 성공할 수 있습니다. ${"\n"}단, 신경이 예민하고 도량이 적은 것이 흠이며 결혼은 연애보다는 중매가 더 나은 결과를 가져올 수 있습니다. 건강 면에서는 잔병치레가 있긴 해도 장수할 운세입니다. ${"\n"}전반적인 운세는 좋지만 30대 중반 성공과 실패가 교차할 일들이 생기니 이때 판단력을 잃지 않으시고 위기를 극복해야하는 관상입니다.`);
          setPartnerShape(`계란형`)
          setSamePerson(`이윤석, 다니엘헤니, 존박`)
          setComment(`감정이 예민하고 빈틈없는 ${"\n"}완벽주의자 타입`)
          break;
        case "오각형":
          setKeyword(`이마가 좁고 빈약하며 광대뼈 밑에서 턱까지의 부위가 넓게 발달된 얼굴 모양을 오각형 얼굴이라고 합니다. 이런 얼굴을 지닌 남성은 마치 턱이 얼굴 전체를 받치고 있는 것 같은 유형으로 초년 운세가 불길하고 부모 복이 없어 타향에서 자수성가 하게 될 것입니다. ${"\n"}우유부단하고 행동이 느리며 형이상학적인 생각의 지배를 받는 단점이 있지만 상업 쪽으로 진출하면 크게 성공할 수 있는 운수입니다. ${"\n"}초년 전체와 중년 초입까지는 어려움이 많으나 그 이후에는 길운이 따르겠습니다.`);
          setPartnerShape(`삼각형`)
          setSamePerson(`공유, 정지찬`)
          setComment(`초년은 어려우나 대기만성 ${"\n"}자수성가 타입`)
          break;
        case "역삼각형":
          setKeyword(`이마 부위만 넓고 크게 발달하여 마치 삼각형을 거꾸로 세워 놓은 듯한 얼굴 모양을 역삼각형 얼굴이라고 합니다. 이런 얼굴을 지닌 남성은 두뇌가 명석하고 총명하며 관찰력이 풍부합니다. ${"\n"}단, 까다롭고 신경질적이라 사업이나 정치 계통보다는 연구나 창작분야에 특출한 능력을 발휘합니다. 물욕보다는 명예욕이 강하며 외근보다는 내근이 적합할 것입니다. ${"\n"}진지함과 성실함, 우직함을 갖춰 잔꾀를 부릴 줄 모르고, 대개 부모에게 물려받은 재산이 많은 형으로 초년운이 좋습니다. 그러나 말년으로 갈수록 어려움이 많을 관상입니다.`);
          setPartnerShape(`둥근형`)
          setSamePerson(`뷔, 김우빈, 임시완`)
          setComment(`총명하고 관찰력이 ${"\n"}풍부한 야망가 타입`)
          break;
        case "네모형":
          setKeyword(`얼굴의 상하좌우 길이가 비슷하고 이마와 턱이 네모져서 각을 이루는 모양을 사각형 얼굴이라고 합니다. 이런 얼굴을 지닌 남성은 뼈대가 강하고 근육이 발달된 편입니다. ${"\n"}성질이 급하지만 용맹스럽고 부지런하며 매사에 정열적이라 내근보다는 외근 활동 업무에 적합할 것입니다. 부귀를 누릴 유형으로 관직이나 스포츠 계통 등에서 크게 두각을 드러내겠습니다. ${"\n"}25세 이전에 결혼을 하면 불리할 수 있으니 그 이후에 하는 것이 좋습니다. 중년 이전까지는 인생에 기복이 많겠지만 중년 이후에는 큰 부를 누릴 수 있을 것입니다.`);
          setPartnerShape(`계란형`)
          setSamePerson(`이병헌, 김범수, 김종국, 이서진`)
          setComment(`용맹스럽고 정열적인 ${"\n"}남자중에 상남자 타입`)
          break;
        case "광대뼈발달형":
          setKeyword(`이마가 좁고 턱이 뾰족하며 광대뼈가 발달한 마름모꼴 얼굴 모양을 광대뼈 발달형이라고 합니다.${"\n"}부모나 형제의 덕이 없어 자수성가할 타입으로 한가지 일에 몰두하며 굳은 의지와 성실한 태도로 계획한 업무를 잘 수행할 것입니다. 엔지니어 계통이나 섬유화학 계통이 적성에 잘 맞겠으며 좋은 성과를 거둘 수 있습니다.${"\n"}신경계통의 질환을 앓을 수 있으니 항상 마음을 편히 갖도록 하십시오 조혼은 실패하기 쉬우니 늦게 결혼하는 것이 길하겠고 중년 이후에 운이 트이겠습니다.`);
          setPartnerShape(`긴타원형`)
          setSamePerson(`서은광, 류준열`)
          setComment(`집중력이 좋고 꾸준함과 성실함이 ${"\n"}장점인 자수성가 타입`)
          break;
        case "이마턱발달형":
          setKeyword(`이마 뼈와 광대뼈, 턱뼈가 솟아올라 얼굴이 울퉁불퉁하고 살집이 없는 얼굴 모양이 지닌 남성은 성격이 직선적이고 융통성이 부족하며 부모 덕이 미약해 자수성가할 운수입니다. ${"\n"}조혼은 실패하기 쉬우니 가급적 늦게 결혼하는 것이 좋으며 건축업이나 용역사업 또는 개인사업이 적성에 잘 맞겠습니다. ${"\n"}초년에서 중년 이전까지는 주거가 안정치 못해 여러 번 이사를 하겠으나 말년에는 평탄하며 금전적으로 고생하는 일은 없을 것입니다.`);
          setPartnerShape(`네모형`)
          setSamePerson(`김강우, 오지호, 이이경`)
          setComment(`융통성이 부족하나 시원시원하고 직선적인 성격의 대장부 타입`)
          break;
        default:
          break;
      }
      

    }else{
      console.log("여자모델 핵석")
      switch(prediction[0].className){
        case "역삼각형":
          setKeyword(`이마 부위가 넓고 얼굴 아래로 갈수록 좁아져 턱부위가 좁은 형을 역삼각형 얼굴이라 합니다. ${"\n"}이러한 얼굴형을 지닌 여성은 섬세하고 지적이며 자존심과 독립성이 강해 어떤 일이든 감정에 치우치지 않고 이성적으로 판단하는 장점을 지니고 있습니다. ${"\n"}반면, 지구력이 약하고 신경이 예민해 자칫 히스테릭한 면을 보일 수 있으니 주의하는 것이 좋겠습니다. 문화 예술 분야나 의약 계통에서 실력을 발휘하는 것이 초년과 중년 운세가 매우 좋을 것입니다.`);
          setPartnerShape(`둥근형`)
          setSamePerson(`가인, 한소희, 청하`)
          setComment(`섬세하고 지적이며 ${"\n"}이성적 판단이 능한 타입`)
          break;
        case "둥근형":
          setKeyword(`원을 그리듯 둥근 모양으로 얼굴 살이 통통한 유형을 둥근 얼굴이라 합니다. 낙천적이면서도 지극히 현실적이며 꿈과 욕심이 많겠습니다. ${"\n"}특히 주위 사람들과 분위기를 잘 맞추는 애교 띤 성격으로 외교수단이 뛰어나지만 정열적인 활동에 다소 약합니다. 그리고 호화스러운 생활을 선호하며 지출이 많은 것이 단점이라 할 수 있습니다. ${"\n"}또한, 이성보다는 순간적 본능을 따라 피해보는 일이 많을 것입니다. 예능분야나 서비스업에 종사하면 특출한 재능을 발휘하며 성공하겠습니다. 운명학상으로 조혼을 하는 경우가 많지만 26세 이후에 결혼하는 것이 길합니다. ${"\n"}운세는 초년, 중년, 말년에 각 한 번씩 고통이 있을 것입니다.`);
          setPartnerShape(`역삼각형`)
          setSamePerson(`공효진, 김다미, 고현정, 김유정`)
          setComment(`낙천적이며 애교가 많아 ${"\n"}늘 사람들 중심에 있는 인싸 타입`)
          break;
        case "네모형":
          setKeyword(`이마와 턱 부위가 각이 지고 얼굴 상하좌우의 폭이 비슷한 사각형 모양을 네모형 얼굴이라 합니다. ${"\n"}매사에 적극적이고 부지런합니다. 또한, 남에게 지기 싫어하는 성격으로 뜻을 세우면 끝까지 성취하려는 강한 집념과 활동력으로 남자 못지 않은 성공을 이루게 될 것입니다. ${"\n"}단, 고집이 세고 기질이 억센 편이라 언행이 거친 결점이 있습니다. 결혼 전이나 후를 막론하고 사회활동을 해야 좋고 늦게 결혼하는 것이 길하겠습니다. ${"\n"}사업사업이나 정치 또는 상공업 분야에서의 활동이 적성에 잘 맞겠습니다. 운세는 초년이나 중년 사이 굴곡이 있지만 말년에는 크게 길할 것입니다.`);
          setPartnerShape(`이마턱발달형`)
          setSamePerson(`김태리, 정유미, 박경림`)
          setComment(`매사에 적극적이며 남에게 ${"\n"}지기 싫어하는 승부욕 있는 승부사 타입`)
          break;
        case "계란형":
          setKeyword(`이마가 넓고 머리가 둥글며 아래턱 부위가 타원형 곡선을 그린 듯한 얼굴 모양이 계란형 얼굴입니다. ${"\n"}냉정하고 이지적입니다. 또한, 주관이 확실해 쉽게 분위기에 휩쓸리지 않고 대인관계에 안정감을 줄 수 있으며 통찰력과 기억력이 매우 좋습니다. ${"\n"}단, 이기적 경향이 있고 내성적인 성격의 소유자가 많아 신경이 예민할 것입니다. 예술적인 방송계열 직업이나 컴퓨터 관련 직업에서는 능력을 발휘할 수 있습니다. 애정운도 대체로 안정세를 이루나 말년 초입부터 희비가 교차하게 될 것입니다. ${"\n"}초년운은 좋지 않지만 청년기를 지나 말년으로 갈수록 운이 상승합니다.`);
          setPartnerShape(`직사각형`)
          setSamePerson(`김태희, 이민정, 태연`)
          setComment(`내성적이나 본인 주관이 뚜렷하고 ${"\n"}통찰력 있는 외유내강 타입`)
          break;
        case "삼각형":
          setKeyword(`이마가 좁고 뾰족하며 아래로 내려오면서 턱 부위가 발달된 모양을 삼각형 얼굴이라 합니다. ${"\n"}대범하고 융통성이 있으며 화술에 능통합니다. 또한 겉은 매우 강직해 보이지만 내면은 부드러움이 자재 되어있는 외유내장 형으로 신체가 건강한 특징을 지녔습니다. ${"\n"}단, 창의력이 부족하고 결단력이 약한 단점도 있습니다. 금융업이나 서비스업 스포츠 계통에 적성이 맞으며 결혼은 20대 후반에 하는 것이 좋습니다. ${"\n"}초년 운세가 매우 좋지 못해 고생이 있지만 그 외에는 운세가 상승곡선을 그리니 걱정하지 않으셔도 됩니다.`);
          setPartnerShape(`오각형`)
          setSamePerson(`윤은혜, 손예진, 배두나`)
          setComment(`대범하고 융통성이 있으며 ${"\n"}화술에 능통한 타입`)
          break;
        case "마름모형":
          setKeyword(`이마와 턱이 좁고 뾰족하며 얼굴 전체 중 광대뼈가 차지하는 부위가 제일 발달되어 그 모양이 마치 마름모꼴인 얼굴입니다. ${"\n"}이런 얼굴의 여성은 부모 덕과 인덕이 약해 온갖 시련을 혼자서 감당해야 하는 단점이 있지만 한 가지 일에 목표를 정하면 웬만한 시련과 장애를 극복해내는 타입니다. ${"\n"}또한 남의 이목에 구애됨없이 자신이 세워 놓은 계획을 완수하고야 마는 굳센 의지와 성실함을 가지고 있습니다. ${"\n"}단, 고집이 너무 강하고 냉정한 면이 잠재해 있기 때문에 사람들에게 좋은 인상을 주지 못합니다. 또한 결혼운이 좋지 않아 일찍 결혼하면 초혼에 성공하지 못하고 재혼을 하는 경우가 많으니 28세 이후에 결혼하는 것이 좋습니다. ${"\n"}운세는 중년으로 갈수록 길하며 직업은 경리나 스포츠 계통, 또는 서비스 산업에 종사해야 적성에 맞습니다.`);
          setPartnerShape(`역삼각형`)
          setSamePerson(`문채원, 이솜, 신민아`)
          setComment(`고집이 쎄나 굳센 의지와 성실함으로 ${"\n"}시련을 극복하는 타입`)
          break;
        case "긴타원형":
          setKeyword(`자신감이 있고 인내력이 강해 지도자가 될 가능성이 많고 독립심이 강해 어떤 일도 혼자의 힘으로 밀어붙이는 경우가 종종 있습니다. ${"\n"}그래서 이런 면이 상대방에겐 이기적이고 독단적인 사람이라고 평가받기 쉬우며 초면에 상대방과 쉽게 친해질 수 없는 부분이 있습니다. ${"\n"}그러나 감성이 뛰어나고 여러 방면으로 재능이 있는 사람이 많고 머리가 좋고 센스가 있는 편입니다. 상황에 따라 자신의 뜻을 굽힐 줄 알고 자신의 문제점을 인정하면 삶의 큰 발전이 있을 관상입니다. ${"\n"}말년으로 가면서 건강에 문제가 생기는 경우가 있으니 유의해야 합니다.`);
          setPartnerShape(`광대뼈발달형`)
          setSamePerson(`려원, 로제, 윤아`)
          setComment(`여러 방면으로 재능이 있고 ${"\n"}센스있는 팔방미인 타입`)
          break;
        default:
          break;
      }

    }

    console.log("가장높은확률 : ",prediction[0].className)
    KakaoLoadTwo();
    
  }


  //react-router 사용
  const navigate=useNavigate();
  // input 태그를 클릭하는 것과 같은 효과를 주기 위해서 사용
  const inputRef=useRef();


  const handleStart=()=>{
    if(!imgBase64){
      return alert("사진을 넣어주세요")
    }
    setLoading(true);
    setShowResult(false)
    init().then(
    console.log("init 완료"),
    predict(checked)
  );
  }


  const handleChangeFile = (event) => {

    setPredictionArr(null);
    setResult(null);

    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      // setImgFile(event.target.files[0]); // 파일 상태 업데이트


    }
    
  }

  const handleShare=()=>{
    if (navigator.share) {
      navigator.share({
          title: '내가 왕이될 상인가?',
          // text: 'Hello World',
          url: 'https://facereader-test.web.app/',
      });
  }else{
      alert("공유하기가 지원되지 않는 브라우저 입니다.")
  }

  }
  
  return (
    <Container >
    <TopContainer>
        <TopTitle>내가 왕이 될 상인가?</TopTitle>
        <TopSubTitle>인공지능 얼굴형 관상 테스트</TopSubTitle>
    </TopContainer>

    {showResult?<TopStart>분석결과</TopStart>:<>
    <TopStartLoading>{loading?"잠시만 기다려주시겠는가":"먼저 나에게 당신의 얼굴을 보여주시겠는가"}</TopStartLoading>
    <CheckBoxContainer>
      <Checkbox
          containerStyle={{marginRight:20}}
          right={true}
          icon={<GrCheckmark color="#AF846D" size={14} />}
          name="my-input"
          checked={checked}
          onChange={() => {
            setChecked(true)
            console.log("남자선택")
          }}
          borderColor="#D7C629"
          style={{ cursor: "pointer"}}
          labelStyle={{ marginLeft: 5, userSelect: "none",color:"#8A6754",fontWeight:"bolder" }}
          label="남자"
        />
        <Checkbox
          containerStyle={{marginLeft:20}}
          right={true}
          icon={<GrCheckmark color="#AF846D" size={14} />}
          name="my-input"
          checked={!checked}
          onChange={() => {
            setChecked(false)
            console.log("여자선택")
          }}
          borderColor="#D7C629"
          style={{ cursor: "pointer" }}
          labelStyle={{ marginLeft: 5, userSelect: "none",color:"#8A6754",fontWeight:"bolder" }}
          label="여자"
        />
    </CheckBoxContainer>
    </>
    }
    <ImageContainer IsImage={imgBase64?true:false}
    onClick={()=>{
      if((showResult&&result!==null) || (loading&&result===null)){
        return null
      }
      inputRef.current.click();
    }}>
      <ImageUploadContainer ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" />
      {imgBase64?<Image id="srcImg" src={imgBase64}></Image>: 
      <>
        <ImageText>관상분석을 위해 사진을 올려주세요!</ImageText>
      </>
      }
    </ImageContainer>
    {!loading&&result===null?<>
    <CommentMsg>※업로드 된 사진은 별도로 {"\n"}수집, 보존
                하지않고 얼굴인식 용도에만 사용됩니다.</CommentMsg>
    <Btn onClick={()=>{handleStart()}}>관상 보기</Btn>
    <div className='adfitOne' style={{backgroundColor:"#FBF6D5",height:"250px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"35px"}}></div>
    <BottomImg src={require('../assets/Home_bottom.png')}></BottomImg>
    </>:null}

    {loading&&result===null?
    <SpinnerContainer>
      <Spinner size={20} color="#BAAD7D"></Spinner>
      <Title>분석중...</Title>
      <BottomImg src={require('../assets/Home_bottom.png')}></BottomImg>
      </SpinnerContainer>
    :null
  }
  {showResult&&result!==null?
      <>
      <MiddleContainer>
          <MainText>당신은 {predictionArr[0].className}상을 가졌구만.</MainText>
          <SubText3>{comment}</SubText3>
          <SubText>{keyword}</SubText>
          <SubText2>내 얼굴형과 비슷한 연예인: {samePerson}</SubText2>
      </MiddleContainer>
      <div className='adfitTwo' style={{backgroundColor:"#FBF6D5",height:"120px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}></div>   
      <RestResultRow>
        <RestResultCol>
          <ResultTitle>나의 예상 인생곡선</ResultTitle>
          <ResultBox>
            <ResultImage src={!checked?require(`../assets/graph/female/${predictionArr[0].className}.png`):require(`../assets/graph/male/${predictionArr[0].className}.png`)}></ResultImage>
          </ResultBox>
        </RestResultCol>
        <RestResultCol>
          <ResultTitle>짝궁 얼굴형은?</ResultTitle>
          <ResultBox>
            {partnerShape&&<ResultImage2 src={checked?require(`../assets/shape/female/${partnerShape}.png`):require(`../assets/shape/male/${partnerShape}.png`)}></ResultImage2>}
            <FaceShape>{partnerShape}</FaceShape>
          </ResultBox>
        </RestResultCol>
      </RestResultRow>
      </>
    :null}
    {showResult&&result!==null?<BottomContainer>
      <KakaoShareBtn name={predictionArr[0].className} checked={checked}></KakaoShareBtn>
      <BottomBtn onClick={()=>{handleShare()}} name={"share"}><MdIosShare size={35} color="#ffffff"></MdIosShare></BottomBtn>
      <BottomBtn onClick={()=>{navigate("/") }} name={"retry"}><BsArrowCounterclockwise size={30} color="white" style={{marginRight:5}}></BsArrowCounterclockwise>다시하기</BottomBtn>
    </BottomContainer>:null
    }

  </Container>
  )
}

export default Main