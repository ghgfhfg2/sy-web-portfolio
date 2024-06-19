import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "styled-components";
import { IoMdOpen } from "react-icons/io";
import { techData } from "../constans/db";
import StackIcon from "tech-stack-icons";
import { Tooltip } from "react-tooltip";

export const DetailContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  dl {
  }
  dt {
    font-weight: 600;
    margin-bottom: 3px;
  }
  dd {
    font-size: 14px;
    a {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .tech-list {
    display: flex;
    gap: 5px;
  }
  .tsi {
    width: 20px;
  }
`;

function DetailModal({ onClose, isOpen, data }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DetailContentBox>
            <Image src={data.image} />

            <dl>
              <dt>프로젝트 설명</dt>
              <dd>{data.info}</dd>
            </dl>
            <dl>
              <dt>기술스택</dt>
              <dd className="tech-list">
                {data.techArr.map((el, idx) => {
                  let findEl = techData.list.find((li) => li.name === el);
                  return (
                    <span
                      key={idx}
                      className="tech-name"
                      data-name={findEl.name}
                      data-tooltip-id="tech-modal-tooltip"
                      data-tooltip-content={findEl.name}
                    >
                      {findEl.exIcon === 1 ? (
                        <div className="tsi">
                          <Image src={`/assets/icons/${findEl.name}.png`} />
                        </div>
                      ) : (
                        <StackIcon name={findEl.name} />
                      )}
                    </span>
                  );
                })}
              </dd>
            </dl>
            <dl>
              <dt>참여작업</dt>
              <dd>{data.work}</dd>
            </dl>
            <dl>
              <dt>플랫폼</dt>
              <dd>{data.platform}</dd>
            </dl>
            {data.note && (
              <dl>
                <dt>비고</dt>
                <dd>{data.note}</dd>
              </dl>
            )}
            <dl>
              <dt>사이트링크(구사이트는 html로 대체)</dt>
              <dd>
                <Link href={data.url} isExternal>
                  바로가기
                  <IoMdOpen />
                </Link>
              </dd>
            </dl>
            <Tooltip id="tech-modal-tooltip" />
          </DetailContentBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DetailModal;
