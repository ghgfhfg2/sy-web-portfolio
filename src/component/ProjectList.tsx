import { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Image, Skeleton, Stack, useDisclosure } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import DetailModal from "./DetailModal";
import { child, get, ref } from "firebase/database";
import { db } from "../firebase";

const WorkListContainer = styled.main`
  width: 100%;
  .work-list {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 25%;
      padding: 0.5rem;
    }
    .work-content-box {
      opacity: 0.2;
      background: #fff;
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
    .child {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
      transition: 0.2s;
    }
    .btn-more {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      opacity: 0;
      transition: 0.2s;
      width: 70px;
      height: 70px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 50%;
      svg {
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }
    img {
      transition: 0.2s;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      max-width: none;
    }
    .cover {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -100%;
      background: rgb(39 107 209 / 80%);
      padding: 10px;
      z-index: 1;
      transition: 0.2s;
      color: #fff;
    }
    .year {
      font-size: 14px;
    }
    .title {
      font-size: 16px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .detail {
      margin-top: 10px;
      font-size: 13px;
    }
    .work-content-box:hover {
      opacity: 1;
      img {
        transform: translate(-50%, -50%) scale(1.1);
      }
      .cover {
        bottom: 0;
      }
      .btn-more {
        opacity: 1;
      }
    }
  }
  .is {
    .work-content-box {
      opacity: 1;
    }
  }
  @media all and (max-width: 1080px) {
    .work-list {
      li {
        width: 50%;
      }
      .title {
        font-size: 14px;
      }
    }
    .work-content-box .cover {
      bottom: 0;
    }
  }
`;

interface WorkListItem {
  date: number;
  image: string;
  info: string;
  note: string | null;
  platform: string;
  sideproject: number;
  tech: string;
  title: string;
  uid: string;
  url: string;
  work: string;
  isTech: boolean | undefined;
}
interface WorkListItems extends Array<WorkListItem> {}

function ProjectList({ selectTech }) {
  const dbRef = ref(db);

  const [workList, setWorkList] = useState<WorkListItems>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectData, setSelectData] = useState();

  useEffect(() => {
    get(child(dbRef, `workListData`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const newWorkListData = [];
          const workListData = snapshot.val();
          for (const key in workListData) {
            const value = workListData[key];
            newWorkListData.push(value);
          }
          newWorkListData.map((el) => {
            el.techArr = el.tech.split(",");
            const isCheck = el.techArr.filter((li) => selectTech.includes(li));
            if (isCheck && isCheck.length > 0) {
              el.isTech = true;
            } else {
              el.isTech = false;
            }
            return el;
          });
          newWorkListData.sort((a, b) => b.date - a.date);
          newWorkListData.sort((a, b) => b.isTech - a.isTech);
          setWorkList(newWorkListData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectTech]);

  const onDetailPop = (data) => {
    onOpen();
    setSelectData(data);
  };
  if (workList) {
    return (
      <>
        <WorkListContainer>
          <ul className="work-list">
            {workList?.map((el, idx) => (
              <li key={idx} className={el.isTech ? "is" : ""}>
                <div
                  className="work-content-box"
                  onClick={() => onDetailPop(el)}
                >
                  <div className="child">
                    <span className="btn-more">
                      <IoIosAdd />
                    </span>
                    <div className="cover">
                      <span className="year">{el.date}</span>
                      <div className="title">{el.title}</div>
                    </div>
                    <Image src={el.image} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {selectData && (
            <DetailModal onClose={onClose} isOpen={isOpen} data={selectData} />
          )}
        </WorkListContainer>
      </>
    );
  } else {
    return (
      <>
        <Stack>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
          </Grid>
        </Stack>
      </>
    );
  }
}

export default ProjectList;
