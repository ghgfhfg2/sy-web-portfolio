import {
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Tooltip } from "react-tooltip";
import { DetailContentBox } from "./DetailModal";
import { Field, Form, Formik } from "formik";
import { MdImageSearch } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { base64toFile, encodeFileToBase64 } from "../utils/commonFunc";
import shortid from "shortid";
import { techData } from "../constans/db";
import StackIcon from "tech-stack-icons";
import styled from "styled-components";

export const TechLabel = styled.label`
  display: flex;
  gap: 5px;
  font-size: 13px;
  img {
    width: 15px;
    height: 15px;
  }
`;

function ModifyModal({ onClose, isOpen, onRender, setIsAddModal }) {
  const toast = useToast();
  const initialValues = {};

  const [selectImage, setSelectImage] = useState<string>();

  const onAddUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    encodeFileToBase64(file).then((res: string) => {
      setSelectImage(res);
    });
  };

  const onCloseFunc = () => {
    setSelectImage("");
    setIsAddModal(false);
    onClose();
  };

  const onSubmit = async (values) => {
    let imageUrl;
    const uid = `${values.name}_${shortid.generate()}`;
    if (selectImage) {
      const file = base64toFile(selectImage, uid);
      const storage = getStorage();
      const storageRef = sRef(storage, `/thumb/${uid}`);
      imageUrl = await uploadBytes(storageRef, file).then((res) => {
        const url = getDownloadURL(res.ref);
        return url;
      });
    }
    set(ref(db, `workListData/${uid}`), {
      ...values,
      uid,
      image: imageUrl,
    })
      .then((res) => {
        onRender();
        toast({
          description: "저장되었습니다.",
          status: "success",
          duration: 1000,
          isClosable: false,
        });
        onCloseFunc();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal onClose={onCloseFunc} isOpen={isOpen} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DetailContentBox>
            <div style={{ position: "relative" }}>
              {selectImage && <Image src={selectImage} />}
              <input
                style={{
                  position: "absolute",
                  zIndex: "-1",
                  width: "0",
                  height: "0",
                  overflow: "hidden",
                }}
                type="file"
                id="upload"
                onChange={onAddUpload}
              />
              <Button
                colorScheme="blue"
                style={{
                  position: "relative",
                }}
              >
                <FormLabel
                  htmlFor="upload"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: "0",
                    top: "0",
                  }}
                ></FormLabel>
                <MdImageSearch />
                이미지 업로드
              </Button>
            </div>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form>
                <Field name="title">
                  {({ field }) => (
                    <>
                      <FormLabel>title</FormLabel>
                      <Input mb={3} {...field} placeholder="title" />
                    </>
                  )}
                </Field>
                <Field name="name">
                  {({ field }) => (
                    <>
                      <FormLabel>name</FormLabel>
                      <Input mb={3} {...field} placeholder="name" />
                    </>
                  )}
                </Field>

                <FormLabel>tech</FormLabel>
                <Flex
                  flexWrap="wrap"
                  role="group"
                  gap="5px 10px"
                  aria-labelledby="checkbox-group"
                >
                  {techData &&
                    techData.list &&
                    techData.list.map((el) => (
                      <>
                        <TechLabel>
                          <Field type="checkbox" name="tech" value={el.name} />
                          {el.exIcon === 1 ? (
                            <Image src={`/assets/icons/${el.name}.png`} />
                          ) : (
                            <StackIcon name={el.name} />
                          )}
                          {el.name}
                        </TechLabel>
                      </>
                    ))}
                </Flex>

                <Field name="tech">
                  {({ field }) => (
                    <>
                      <Textarea
                        mt={2}
                        readOnly
                        mb={3}
                        {...field}
                        placeholder="tech"
                      />
                    </>
                  )}
                </Field>
                <Field name="info">
                  {({ field }) => (
                    <>
                      <FormLabel>info</FormLabel>
                      <Input mb={3} {...field} placeholder="info" />
                    </>
                  )}
                </Field>
                <Field name="url">
                  {({ field }) => (
                    <>
                      <FormLabel>url</FormLabel>
                      <Input mb={3} {...field} placeholder="url" />
                    </>
                  )}
                </Field>
                <Field name="date">
                  {({ field }) => (
                    <>
                      <FormLabel>date</FormLabel>
                      <Input mb={3} {...field} placeholder="date" />
                    </>
                  )}
                </Field>
                <Field name="work">
                  {({ field }) => (
                    <>
                      <FormLabel>work</FormLabel>
                      <Input mb={3} {...field} placeholder="work" />
                    </>
                  )}
                </Field>
                <Field name="platform">
                  {({ field }) => (
                    <>
                      <FormLabel>platform</FormLabel>
                      <Input mb={3} {...field} placeholder="platform" />
                    </>
                  )}
                </Field>
                <Field name="note">
                  {({ field }) => (
                    <>
                      <FormLabel>note</FormLabel>
                      <Input mb={3} {...field} placeholder="note" />
                    </>
                  )}
                </Field>
                <Field name="sideproject">
                  {({ field }) => (
                    <>
                      <FormLabel>sideproject</FormLabel>
                      <Input mb={3} {...field} placeholder="sideproject" />
                    </>
                  )}
                </Field>

                <Button width="100%" colorScheme="blue" type="submit">
                  저장
                </Button>
              </Form>
            </Formik>

            <Tooltip id="tech-modal-tooltip" />
          </DetailContentBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModifyModal;
