import styled from 'styled-components';
import { BlockTitle, Block } from 'framework7-react';


export const StyledSlide = styled.div`
  display: flex;
  justify-content: center;
`;

export const SliderWrapper = styled.div`
  margin-top: 50px;
  .swiper-pagination-bullets {
    bottom: -6px;
  }
  .swiper-scrollbar {
    visibility: hidden;
  }
`;

export const SliderTitle = styled(BlockTitle)`
  text-align: center;
  font: bold 18px/24px PT Sans;
  margin-bottom: 10px;
`;

export const SliderText = styled(Block)`
  text-align: center;
  font: normal 14px/20px Source Sans Pro;
  margin: 0px auto;
  margin-bottom: 20px;
  width: 180px;
  padding: 0;
`;

export const AuthButtonsBlock = styled(Block)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 20px;


  a {
    min-width: 250px;
    width: 250px;
    display: block;
    border-radius: 3px;
    margin-bottom: 15px
  }

  & a:last-child {
    margin-bottom: 0;
    border: 1px solid #fff;
    color: #fff;
  }
`;

export const SocialBlock = styled(Block)`
  display: flex;
  justify-content: center;
  align-items: center;

  .row {
    display: flex;
    width: 250px;
    align-items: center;
  }

  p {
    font: 300 14px/20px Source Sans Pro;
    margin: 0 30px 0 0;
  }

  & a:first-child {
    margin-left: 20px;
    display: block;
  }

`;
