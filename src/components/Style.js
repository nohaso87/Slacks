import styled from "styled-components";
import { LogoColor, LogoFont } from "./Constants";
import { BiPlus } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Logo } from "./PanelTwo/DirectMsg/DirectElements";
import { MdStarRate } from "react-icons/md";
import ScrollToBottom from "react-scroll-to-bottom";
import { MdOutlineArrowRight } from "react-icons/md";
import { FaUserAlt } from 'react-icons/fa'
import { ImSpinner3 } from 'react-icons/im'
import { BiArrowBack } from 'react-icons/bi'


// Login & Signup Pages
export const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width:768px){
    background-color: #fff; 
  }
`;
export const AuthLogo = styled.h1`
  font-family: "Montserrat", sans-serif;
  color: ${LogoColor};
`;
export const AuthForm = styled.form`
  width: 400px;
  padding: 10px 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  border-radius: 5px;

  @media (max-width:768px){
    width: 90%;
    padding: 15px 10px;
  }
`;
export const AuthInput = styled.input`
  padding: 5px;
  margin: 3px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;

  &:last-child {
    background-color: ${LogoColor};
    color: #fff;
    font-weight: bold;
    border-color: #fff;
    cursor: pointer;

    @media (max-width:768px){
      width: 100px !important;
      height: 30px;
      margin-top: 10px !important;
      margin: 0 auto;
      font-size: 16px;
    }
  }
  @media (max-width:768px){
    font-size: 16px;
  }
`;
export const AuthOption = styled.div`
  width: 380px;
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  font-size: 12px;

  @media (max-width:768px){
    font-size: 16px;  
  }
`;
export const AuthLink = styled.span`
  color: ${LogoColor};
  font-weight: bold;
  cursor: pointer;
`;

// Home General
export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 2.1fr 8.5fr;
  overflow: hidden;

  @media (max-width: 768px){
    width: 100% !important;
    grid-template-columns: 0 1fr 0;
  }
`;
export const Panel = styled.div`
  padding-left: 20px;

  &:first-child {
    background-color: #2d3436;
    padding: 25px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:nth-child(2) {
    background-color: #fff;

    @media (max-width: 768px){
      width: 100%;
      z-index: 555;
    }
  }

  &:nth-child(3) {
    position: relative;
    padding-left: 0;
    transition: 0.35s all ease;

    @media (max-width: 768px){
      width: 100%;
      height: 100vh;
      min-height: 720px;
      background-color: #fff;
      position: absolute;
      z-index: 777;
      border-left: 1px solid #e8e8e8;
      left: ${props => props.revealChannel === "true" ? '0' : '100%'}
    }
  }

  @media (max-width: 768px){
    padding-left: 0;
  } 
`;
export const InnerPanel = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px){
    margin-top: 0;
    grid-template-columns: 1fr 0;
    width: 100%;
    margin: 0 auto;
  }
`;
export const SecondInnerPanel = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;
export const AppLogo = styled.h2`
  font-family: ${LogoFont};
  color: ${LogoColor};

  @media (max-width: 768px){
    padding-left: 20px;
  }
`;

// Panel One
export const AddTheme = styled.div`
  background-color: #3498db;
  border-radius: 5px;
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
`;
export const AddThemePlus = styled(BiPlus)`
  color: #fff;
  font-size: 18px;
  font-weight: 800;
`;

// Panel Two Sections General Settings

export const Section = styled.div`
  width: calc(100% - 20px);
  padding: 5px 0;
  margin-top: 20px;
  font-size: 12px;

  @media (max-width: 768px){
    font-size: 16px;
    padding-left: 20px;
  }
`;
export const Header = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 0.5fr 5fr 1fr;
  align-items: center;
`;
export const Name = styled.div`
  padding-left: 10px;
`;
export const List = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  overflow: scroll;
  padding: 5px 0;
  margin-top: 5px;
  //background-color: #f9f9f9;
`;
export const ListItems = styled.p`
  position: relative;
  margin: 0;
  padding: 5px 0 5px 15px;
  cursor: pointer;

  &:hover {
    color: ${LogoColor};
    font-weight: bold;
  }
`;
export const ActiveLight = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  right: 10px;
  top: 7px;
  border-radius: 50%;
`

// Panel Three
export const ChatAreaBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const HeaderLoading = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  background-color: ${LogoColor};
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${props => props.visible === "false" ? "hidden" : "visible"};
  transition: 0.35s all ease;
  z-index: 777;
`
export const LoadingIcon = styled(ImSpinner3)`
  color: #000;
  font-size: 14px;
`
export const ChatHeaderBox = styled.div`
  position:relative;
  width: 90%;
  height: 80px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 0 15px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width:768px){
    width: calc(100% - 25px);
    padding-right: 10px;
    border-radius: 0;
    border-bottom: 1px solid #e8e8e8;
  }
`;
export const ChatInfo = styled.div``;
export const GoBack = styled(BiArrowBack)`
  position: absolute;
  left: 0px;
  top: 20px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  display: none;

  @media (max-width: 768px){
    display: block;
  }
`
export const ChatTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px){
    padding-left: 30px;
  }
`;
export const Starr = styled(MdStarRate)`
  align-self: center;
  color: ${(props) => (props.colorofstar === "true" ? "orange" : "#333")};
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 768px){
    position: absolute;
    font-size: 30px;
    right: 15px;
  }
`;
export const ChatUsers = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
  font-weight: normal;

  @media (max-width:768px){
    font-size: 16px;
    color: grey;
  }
`;
export const SenderActiveStatus = styled(ChatUsers)``
export const ChatSearchBox = styled.input`
  border: 1px solid #e8e8e8;
  padding: 7px 5px;
  border-radius: 3px;
  outline: none;

  @media (max-width:768px){
    display: none;
  }
`;
export const ChatContent = styled.div`
  position: relative;
  width: 90%;
  padding: 0 20px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  margin: 15px auto;
  border-radius: 5px;

  @media (max-width: 768px){
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #e8e8e8;
  }
`;
export const PillContainer = styled(ScrollToBottom)`
  list-style: none;
  width: 70%;
  height: calc(100% - 30px);
  overflow-y: scroll;
  overflow-x: none !important;
  padding: 0;
  margin-top: 15px;
`;
export const ReplyPills = styled.div`
  display: inline-block;
  padding: 5px;
  font-size: 14px;
  margin: 5px 0;
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  display: grid;
  grid-template-columns: 0.5fr 3fr;
`;
export const ReplyData = styled.div``;
export const ReplyTitle = styled.div``;
export const ReplyMessage = styled.div`
  font-size: 13px;
`;
export const ReplyMedia = styled.img`
  width: 100%;
  margin-top: 3px;
`
export const SenderName = styled.div`
  display: inline-block;
  font-weight: bold;
  margin-right: 5px;
  cursor: ${(props => props.me === "true" ? "auto" : "pointer")};
  transition: 0.35s all ease;

  &:hover {
    color: ${(props => props.me === "true" ? "#000" : LogoColor)}
  }
`;
export const ChatCreatorBox = styled.div`
  width: calc(100% - 50px);
  padding: 10px 10px;
  margin: 0 0 0 15px;
  position: absolute;
  left: 0;
  bottom: 20px;
  background-color: #fff;
  z-index: 999;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px){
    bottom: 150px;
  }
`;
export const CreatorInput = styled.input`
  border: 1px solid #e8e8e8;
  padding: 7px 7px 7px 30px;
  border-radius: 3px;
  outline: none;

  @media (max-width: 768px){
    font-size: 16px;
    margin-bottom: 30px;
    padding: 10px 10px 10px 40px;
  }
`;
export const CreatorMedia = styled.div`
  position: absolute;
  width: 25px;
  height: 30px;
  left: 10px;
  font-size: 30px;

  @media (max-width: 768px){
    width: 40px;
    height: 40px;
    font-size: 40px;
    top: 12px;
    left: 12px;
  }
`
export const CreateMediaNotify = styled.div`
  background-color: ${LogoColor};
  border-radius: 5px;
  position: absolute;
  padding: 5px 5px;
  left: 40px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px){
    left: 50px;
    top: 17px;
  }
`
export const CreatorButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
  border-radius: 3px;
  overflow: hidden;
  text-align: center;
`;
export const CreatorButton = styled.input`
  width: 50%;
  padding: 5px 0;
  background-color: red;
  border: 1px solid transparent;
  cursor: pointer;
  color: #fff;
  font-weight: bold;

  &:first-child {
    background-color: orange;
  }

  &:last-child {
    background-color: #5cb85c;
  }

  @media (max-width: 768px){
    margin: 0 auto;
    width: 40%;
    font-size: 16px;
  }
`;
export const ImageLogo = styled(FaUserAlt)`
  color: #fff;
`
export const ReplyImage = styled.div`
width: 40px;
height: 40px;
margin-right: 10px;
background-color: ${props => props.design};
border-radius: 3px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
overflow: hidden;
background-image: url(${(props)=> props.img ? props.img : ""});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
font-size: 16px;
font-weight: bold;
color: #fff;
`

// Panel Four
export const DetailsBox = styled.div`
  width: 95%;
  background-color: #f9f9f9;
  display: ${props => props.uninstall === "true" ? "none" : "block"};

  @media (max-width: 768px){
    display: none;
  }
`;
export const DetailsHeader = styled.div`
  position: relative;
  width: 100%;
  min-height: 20px;
  margin: 0 auto;
  //padding: 0 10px 0 0;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  color: grey;
  display: flex;
  align-items: center;
  background-color: #fff;
`;
export const DetailsContent = styled.div`
  position: relative;
  width: 90%;
  padding: 0 5px;
  transition: all 0.35s ease;
  height: ${(props) => (props.active === true ? "70px" : "0")};
  border: 1px solid #e9e9e9;
  border-top-style: none;
  border-bottom-style: none;
  margin: 0 auto;
  overflow: hidden;

  &:last-child {
    border-bottom: 1px solid #e9e9e9;
  }
`;
export const DetailsArrow = styled(MdOutlineArrowRight)`
  font-size: 30px;
`;
export const CreatedBy = styled.div`
  font-size: 12px;
  color: grey;
  padding: 10px 0 0 10px;

  &:first-child {
    font-weight: bold;
  }
`;
export const TopPoster = styled(CreatedBy)``;
export const TopPosterSpan = styled.span`
  font-size: 12px;
  font-weight: normal;
`;
export const RoomDetails = styled(CreatedBy)`
  font-weight: normal !important;
`;

// Add Channel

export const AddNewChannel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: ${(props) => (props.status === true ? "block" : "none")};
`;
export const NewChannelWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;
export const NewChannelForm = styled(AuthForm)``;
export const NewChannelInput = styled(AuthInput)`
  
  &:last-child {
    
    @media (max-width: 768px){
      width: 150px !important;
    }
  }
`;
export const NewChannelAbout = styled.textarea`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;  

  @media (max-width: 768px){
    font-size: 16px;
  }
`;
export const AddChannelClose = styled.div`
  position: relative;
  padding: 5px 10px;
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;
  color: #fff;
  border-radius: 20px;
  font-size: 30px;

  @media (max-width: 768px){
    margin-top: 30px;
  }
`;
// UPLOAD
export const UploadBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  visibility: ${(props) => props.visible};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
export const ImageViewer = styled.div`
  width: 300px;
  height: 300px;
  // overflow: hidden;
  border-radius: 50%;
  border: 1px dashed #f9f9f9;
  background: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const TempImage = styled.img`
  width: 100%;
  margin: 0 auto;
  background-size: cover;
`;
export const ImageName = styled.p``;
export const ImageInput = styled(CreatorInput)`
  margin: 5px 0;
  padding: 4px 0;
  border: none;
  width: 78px;

  @media (max-width: 768px){
    font-size: 16px;
    width: 85px;
  }
`;
export const ImageSubmit = styled(CreatorInput)`
  background-color: ${LogoColor};
  padding-left: 8px;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);

  @media (max-width: 768px){
    font-size: 16px;
    margin-top: 10px;
  }
`;
export const ImageBoxClose = styled(AddChannelClose)`
  font-size: 30px;
  background-color: transparent;

`;
