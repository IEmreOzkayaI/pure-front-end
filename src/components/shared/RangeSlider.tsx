import * as React from "react";
import { styled, alpha, Box } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";

export default function RangeSlider({ marks }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Compay Size"
        defaultValue={10}
        getAriaValueText={valuetext}
        marks={marks}
        step={1}
        min={0}
        max={40}
        slots={{ valueLabel: SliderValueLabel }}
      />
    </Box>
  );
}

function SliderValueLabel({ children }) {
  return (
    <span className="label">
      <div className="value">{children} Company</div>
    </span>
  );
}

function valuetext(value: number) {
  return `${value}`;
}

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: #A1AEB7;
  height: 0.6rem;
  width: 98.8rem;
  padding: 1.6rem 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }


  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 0.4rem;
    border-radius: 0.2rem;
    background: linear-gradient(90deg, #16161B 12.17%, #6C7B9F 38.11%, #F5F3F3 101.62%);
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 0.4rem;
    border-radius: 0.2rem;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    margin-left: -0.6rem;
    margin-top: -0.6rem;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-image:url('./slider.svg')  ;

  }
   & .label {
        font-family: Ubuntu;
        font-weight: 600;
        font-size: 1.4rem;
        background-color: #16161B;
        padding: 0;
        visibility: hidden;
        position: absolute;
        
    }
    :hover .label {
        color: #A1AEB7;
        text-align: justify;
        font-family: Ubuntu;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5233rem; 
        visibility: visible;
        transform: translate(-25%, -140%) ;
        width: 8rem;
        padding: 0.4rem 0.4rem 0.4rem 0.6rem;
        border-radius: 0.8rem;
        transition: opacity 0.3s;
        z-index: 1;
        left:-1.1rem;
         &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -0.5rem;
            border-width: 0.5rem;
            border-style: solid;
            border-color: #16161B transparent transparent transparent;
        }
    }
    :hover .value {
        width: 100%;
    }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 99%;
    top: 43%;
    transform: translateX(-50%);
    color: #A1AEB7;
    text-align: justify;
    font-family: Ubuntu;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5233rem;
  }


  & .${sliderClasses.markLabel} {
    font-family: Ubuntu;
    font-weight: 400;
    font-size: 1.2rem;
    position: absolute;
    top: 2rem;
    transform: translateX(-50%);
    margin-top: 0.8rem;
  }
`
);
