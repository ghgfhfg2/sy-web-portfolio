import styled from "styled-components";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { auth, db, provider } from "../firebase";
import { useEffect, useState } from "react";
import useStore from "../store/user";
import Loading from "./common/Loading";
import { FcGoogle } from "react-icons/fc";
import { colors } from "../constans/colors";
import { Link } from "react-router-dom";
import { get, ref } from "firebase/database";
import { IoMdSettings } from "react-icons/io";
import ModifyModal from "./ModifyModal";
import { FaPlus } from "react-icons/fa";
import AddProjectModal from "./AddProjectModal";

const AdminWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;

  .login-container {
    padding: 4rem;
    width: 80%;
    max-width: 600px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .btn-login {
      height: 50px;
      width: 100%;
      border: 1px solid ${colors.BLUE_600};
      color: #222;
      background: #fff;
    }
    .btn-login svg {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
  .admin-container {
    .content-box {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
    main {
      width: 95%;
      margin: 2rem auto;
      padding: 1rem;
      background: #fff;
      overflow: hidden;
      table {
        font-size: 13px;
      }
      tr:hover {
        background: #f5f5f5;
      }
      th {
        background: #333;
        color: #fff;
      }
      td {
        width: 13%;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      tr th:first-child {
        width: 50px;
      }
      tr td:first-child {
        width: 50px;
      }
    }
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    header {
      width: 100%;
      padding: 2rem 1rem;
      background: #fff;
      h1 {
        font-size: 18px;
        font-weight: 700;
      }
      .content-box {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

function Admin() {
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  interface WorkItem {
    uid?: string;
    [key: string]: any;
  }

  const [workList, setWorkList] = useState<WorkItem[]>();
  const getProjectData = () => {
    get(ref(db, `workListData`)).then((data) => {
      const arr = [];
      for (const key in data.val()) {
        if (!data.val()[key].uid) {
          data.val()[key].uid = key;
        }
        arr.push(data.val()[key]);
      }
      setWorkList(arr);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUser(user);
        getProjectData();
      } else {
        setIsLogin(false);
      }
      setIsLoading(false);
    });
  }, []);

  const [render, setRender] = useState(true);
  const onRender = () => {
    setRender(!render);
  };
  useEffect(() => {
    getProjectData();
  }, [render]);

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        clearUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        if (user.uid === "JUI9jJDZVNWBSaaTmUygDSuV6Zj1") {
          setUser(user);
        }
      })
      .catch(() => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [selectData, setSelectData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModifyModal = (data) => {
    setSelectData(data);
    onOpen();
  };

  const [isAddModal, setIsAddModal] = useState(false);
  const onAddProject = () => {
    setIsAddModal(true);
    onOpen();
  };

  if (isLoading) {
    return <Loading height="300px" />;
  }
  return (
    <AdminWrapper>
      {isLogin ? (
        <div className="admin-container">
          <header>
            <div className="content-box">
              <Link to="/admin">
                <h1>Administrator</h1>
              </Link>
              <Button onClick={onLogout}>logout</Button>
            </div>
          </header>
          <main>
            <Button onClick={onAddProject} colorScheme="blue" mb={3}>
              <FaPlus style={{ marginRight: "10px" }} />새 프로젝트 추가
            </Button>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>title</Th>
                    <Th>tech</Th>
                    <Th>info</Th>
                    <Th>url</Th>
                    <Th style={{ width: "55px" }}>date</Th>
                    <Th>work</Th>
                    <Th>platform</Th>
                    <Th>note</Th>
                    <Th style={{ width: "50px" }}>sideproject</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {workList &&
                    workList.map((el) => (
                      <Tr key={el.uid}>
                        <Td>
                          <Button size="sm" onClick={() => onModifyModal(el)}>
                            <IoMdSettings />
                          </Button>
                        </Td>
                        <Td>{el.title}</Td>
                        <Td>{el.tech}</Td>
                        <Td>{el.info}</Td>
                        <Td>{el.url}</Td>
                        <Td style={{ width: "55px" }}>{el.date}</Td>
                        <Td>{el.work}</Td>
                        <Td>{el.platform}</Td>
                        <Td>{el.note}</Td>
                        <Td style={{ width: "50px", textAlign: "center" }}>
                          {el.sideproject}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </main>
          {selectData && (
            <ModifyModal
              onRender={onRender}
              onClose={onClose}
              isOpen={isOpen}
              setSelectData={setSelectData}
              data={selectData}
            />
          )}
          {isAddModal && (
            <AddProjectModal
              onRender={onRender}
              setIsAddModal={setIsAddModal}
              onClose={onClose}
              isOpen={isOpen}
            />
          )}
        </div>
      ) : (
        <div className="login-container">
          <div className="login">
            <Text fontSize="xl" fontWeight="600" mb={5}>
              관리자 로그인
            </Text>
            <Button onClick={onGoogleLogin} className="btn-login">
              <FcGoogle />
              구글 로그인
            </Button>
          </div>
        </div>
      )}
    </AdminWrapper>
  );
}

export default Admin;
