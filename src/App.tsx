import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { size } from "./constans/size";
import { Button } from "@chakra-ui/react";
import { colors } from "./constans/colors";
import ProjectList from "./component/ProjectList";
import { Tooltip } from "react-tooltip";
import TechStackList from "./component/TechStackList";
import Footer from "./component/Footer";
const Wrapper = styled.div`
  background: #f1f1f1;
`;
const ContainerBox = styled.main`
  width: 100%;
  max-width: ${size.CONTENT_PC};
  margin: 0 auto;
  padding: 0 1rem;
  padding-top: 190px;
  @media all and (max-width: 1080px) {
    padding-top: 100px;
  }
`;

const TechStackWrapper = styled.div`
  .btn-close {
    position: absolute;
    width: 100px;
    height: 30px;
    right: 1rem;
    bottom: -30px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  position: fixed;
  top: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  .tech-box {
    position: relative;
    width: 100%;
    max-width: ${size.CONTENT_PC};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
    &:last-of-type {
      border: 0;
      padding-bottom: 0;
    }
  }
  dt {
    font-size: 12px;
    width: 120px;
    font-weight: 600;
    color: ${colors.BLACK_100};
  }
  dd {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .tsi {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 12px;
    border-radius: 7px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    transition: 0.2s;
    &:hover {
      transform: scale(1.15);
    }
  }
  &.on {
    dt {
      width: 100%;
    }
  }
  &.off {
    height: auto;
    .tech-box {
      flex-direction: row;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 1rem;
    }
    .tsi {
      width: 45px;
      height: 45px;
      padding: 8px;
    }
    dl {
      border: 0;
      padding: 0;
    }
    dt {
      display: none;
    }
  }
  .on .tsi {
    border: 1px solid ${colors.BLUE_600};
  }
  @media all and (max-width: 1080px) {
    gap: 10px;
    .tech-box {
      gap: 10px;
      padding: 1rem;
      flex-direction: column;
    }
    dl {
      align-items: flex-start;
      padding: 0 10px 10px 10px;
      padding-bottom: 5px;
      border: 0;
      gap: 5px;
    }
    dt {
      width: auto;
    }
    dt br {
      display: none;
    }
    .tsi {
      width: 40px;
      height: 40px;
      padding: 8px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
    }
    .btn-close {
      height: 25px;
      width: 80px;
      bottom: -25px;
    }
    &.off {
      height: auto;
      .tech-box {
        padding: 1rem;
        flex-wrap: nowrap;
        overflow: auto hidden;
      }
      dl {
        flex-direction: row;
        flex-wrap: nowrap;
      }
      .tsi {
        width: 34px;
        height: 34px;
        padding: 5px;
      }
    }
  }
`;

function App() {
  const stackWrapper = useRef();
  const containerRef = useRef();

  const changeSelectStyle = (arr, ref) => {
    const list = ref.current.querySelectorAll(".tech-name");
    list.forEach((el) => {
      const isCheck = arr.find((li) => li === el.dataset.name);
      if (isCheck) {
        el.classList.add("on");
      } else {
        el.classList.remove("on");
      }
    });
  };
  const [selectTech, setSelectTech] = useState(["html5"]);
  const onSelectTech = (e) => {
    if (!e.target.closest(".tech-name")) {
      return;
    }
    const name = e.target.closest(".tech-name").dataset.name;
    let newSelectTech;
    newSelectTech = [name];
    //const isNameCheck = selectTech.find((el) => el == name);
    // if (isNameCheck) {
    //   newSelectTech = selectTech.filter((el) => el !== name);
    // } else {
    //   newSelectTech = [...selectTech, name];
    // }
    setSelectTech(newSelectTech);
    changeSelectStyle(newSelectTech, stackWrapper);
  };

  const [techStackOpen, setTechStackOpen] = useState(false);

  const onTechOpen = () => {
    const state = !techStackOpen;
    setTechStackOpen(state);
  };

  useEffect(() => {
    changeSelectStyle(selectTech, stackWrapper);
  }, [techStackOpen]);

  return (
    <>
      <Wrapper>
        <TechStackWrapper
          ref={stackWrapper}
          className={techStackOpen ? "on" : "off"}
        >
          <div className="tech-box" onClick={onSelectTech}>
            <TechStackList techStackOpen={techStackOpen} />
            <Tooltip id="tech-tooltip" />
          </div>
          <Button className="btn-close" onClick={onTechOpen}>
            {techStackOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </TechStackWrapper>
        <ContainerBox ref={containerRef}>
          <ProjectList selectTech={selectTech} />
        </ContainerBox>
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
