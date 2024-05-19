import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10000,
});

export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "800px",
  height: "max-content",
  maxHeight: "500px",
  overflowY: "auto",
  backgroundColor: vars.color.mainDarker, // 배경색에 투명도를 추가하고 RGB 값으로 변경
  borderRadius: "14px",
  padding: "20px",
  boxShadow: vars.shadow.basic, // 그림자 스타일 변경
  color: vars.color.brightText, // 텍스트 색상을 밝은 텍스트 색상으로 변경
});

export const header = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "40px",
});

export const closeButton = style({
  fontSize: vars.fontSizing.T2, // 변수를 사용하여 폰트 크기 설정
  cursor: "pointer",
  marginTop: "-20px", // 단위를 'px'로 수정
  ":hover": {
    opacity: 0.8,
  },
});

export const title = style({
  fontSize: vars.fontSizing.T2, // 변수를 사용하여 폰트 크기 설정
  color: vars.color.brightText, // 변수를 사용하여 텍스트 색상 설정
  marginRight: "auto",
  marginBottom: vars.spacing.medium, // 변수를 사용하여 간격 설정
});

export const buttons = style({
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "50px",
});

export const updateButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});

export const deleteButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});

export const input = style({
  width: "100%",
  minHeight: "30px",
  border: "none",
  borderRadius: 5,
  marginBottom: vars.spacing.big2,
  padding: vars.spacing.medium,
  fontSize: vars.fontSizing.T4,
  boxShadow: vars.shadow.basic,
});
