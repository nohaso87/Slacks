import styled from "styled-components";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { LogoColor } from "../../Constants";
import { FaUserAlt } from 'react-icons/fa'
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

// This enables react svg font to be used with background url()
const reactSvgComponentToMarkupString = (Component) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(createElement(Component))
  )}`;

export const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 20px);
  padding: 5px 0;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  align-items: center;
  z-index: 888;

  @media (max-width: 768px){
    width: 100%;
    grid-template-columns: 1fr 4fr 0.3fr;
  }
`;
export const ImageLogo = styled(FaUserAlt)`
  color: #fff;
`
export const Image = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${LogoColor};
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url(${(props)=> props.img ? props.img : ""});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px){
    width: 60px;
    height: 60px;
    margin-left: 20px;
    font-size: 30px;
  }

  // &:after{
  //   content: url(${reactSvgComponentToMarkupString(ImageLogo)});
  // }
`;

export const avatarImage = styled.img`
    width: 100%;
    position: relative;
`
export const User = styled.span`
  @media (max-width: 768px){
    padding-left: 10px;
    font-weight: bold;
  }
`;
export const Options = styled(MdOutlineArrowDropDown)`
  font-size: 30px;
  cursor: pointer;

  @media (max-width: 768px){
    padding-right: 20px !important;
  }
`;
export const Settings = styled.div`
  position: absolute;
  justify-self: right;
  bottom: -80px;
  width: 110px;
  padding: 10px 10px 10px 0;
  background-color: #fff;
  border: 1px solid ${LogoColor};
  transition: all 0.35s ease;
  display: ${(props) => props.status === true ? 'block' : 'none'};

  @media (max-width: 768px){
    width: 100%;
    border: none;
    background-color: #f9f9f9;
    margin: 0;
    left:0;
    background-color: ${LogoColor};
    bottom: -100px;
  }
`;
export const SettingOptions = styled.p`
  margin: 0; 
  font-size: 12px;
  text-align: right;
  padding: 8px 8px 8px 0;
  margin-bottom: 2px;
  cursor: pointer;

  @media (max-width: 768px){
    font-size: 16px;
    padding-right: 20px;
    color: #fff;

    &:first-child {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    &:last-child {
      font-weight: bold;
    }

  }
`;
