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
  font: normal 14px/20px Lato;
  margin: 0px auto;
  margin-bottom: 20px;
  width: 180px;
  padding: 0;
`;
