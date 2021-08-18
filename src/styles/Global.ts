import styled, { css } from "styled-components";
import { NoteyColors, Size, Styles } from "@lib/constants";

export const DEFAULT_INPUT_STYLES = css`
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 2px solid ${NoteyColors.LightGray};
  background: ${NoteyColors.DarkGray};
  border-radius: ${Styles.BorderRadius};
  color: ${NoteyColors.Text};
  transition: border 200ms;

  @media (hover: hover) {
    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  &:focus {
    border-color: #fff;
  }
`;

export const DEFAULT_BTN_STYLES = css<{ bgColor?: string }>`
  padding: 0.3rem 10px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 500;
  border-radius: ${Styles.BorderRadius};
  background: ${(props) => (props.bgColor ? props.bgColor : NoteyColors.LightGray)};
  color: ${NoteyColors.Text};
  border: 1px solid transparent;
  transition: filter 200ms, opacity 200ms;

  @media (min-width: ${Size.DefaultMinWidth}) {
    padding: 7px 20px;
  }

  &:hover {
    filter: brightness(140%);
  }

  &:focus {
    filter: brightness(150%);
  }

  &:active {
    filter: brightness(120%);
  }

  &:disabled {
    &:hover,
    &:active,
    &:focus {
      filter: brightness(100%);
    }
  }
`;

export const AppLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas: "main";
  @media (min-width: ${Size.DefaultMinWidth}) {
    grid-template-areas: "aside main";
    grid-template-columns: ${Size.SidebarFull} auto;
  }
`;

export const TextArea = styled.textarea<{ maxHeight?: string; minHeight?: string }>`
  ${DEFAULT_INPUT_STYLES}
  resize: vertical;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "")};
`;

export const Button = styled.button<{ danger?: boolean; navBtn?: boolean }>`
  ${DEFAULT_BTN_STYLES}

  &.ml {
    margin-left: 5px;
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.7;

      &:hover,
      &:active,
      &:focus {
        filter: brightness(100%);
      }
    `}

  ${(props) =>
    props.danger &&
    css`
      background-color: ${NoteyColors.Red};
      border: 1px solid ${NoteyColors.Red};
      color: black;
    `}

  ${(props) =>
    props.navBtn &&
    css`
      display: none;
      margin-right: 0.2rem;

      @media (min-width: ${Size.DefaultMinWidth}) {
        display: block;
      }
    `}
`;

export const Row = styled.div`
  display: flex;
`;

export const RowCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  ${DEFAULT_INPUT_STYLES}
`;

export const ReportBtn = styled.a`
  ${DEFAULT_BTN_STYLES}
  text-align: center;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  font-weight: 600;
`;

export const Divider = styled.div`
  padding-top: 5px;
  border-top: 2px solid ${(props) => (props.color ? props.color : "#555")};
`;

export const SrOnly = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
