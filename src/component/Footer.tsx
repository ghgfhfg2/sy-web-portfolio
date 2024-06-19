import styled from "styled-components";
import { size } from "../constans/size";
import { colors } from "../constans/colors";
const FooterBox = styled.footer`
  background: #fff;
  margin-top: 2rem;
  width: 100%;
  padding: 1.5rem 0;
  border-top: 1px solid ${colors.BORDER};
  .content-box {
    padding: 1rem;
    width: ${size.CONTENT_PC};
    margin: 0 auto;
    color: ${colors.BLACK_700};
    font-size: 14px;
  }
  @media all and (max-width: 1080px) {
    padding: 0.5rem 0;
    .content-box {
      width: 100%;
      font-size: 12px;
    }
  }
`;

function Footer() {
  return (
    <FooterBox>
      <div className="content-box">
        © Copyright 2024 All rights reserved by sy_dev
      </div>
    </FooterBox>
  );
}

export default Footer;
