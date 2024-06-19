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
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { ref, remove, update } from "firebase/database";
import { db } from "../firebase";
import {
  base64toFile,
  encodeFileToBase64,
  isObjectEqual,
} from "../utils/commonFunc";
import shortid from "shortid";
import { techData } from "../constans/db";
import { TechLabel } from "./AddProjectModal";
import StackIcon from "tech-stack-icons";

function ModifyModal({ onClose, isOpen, data, onRender, setSelectData }) {
  const toast = useToast();
  const initialValues = { ...data, tech: data.tech.split(",") };
  const storage = getStorage();
  const [selectImage, setSelectImage] = useState<string>();

  const onAddUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    encodeFileToBase64(file).then((res: string) => {
      setSelectImage(res);
    });
  };

  const onCloseFunc = () => {
    setSelectImage("");
    setSelectData();
    onClose();
  };

  const onSubmit = async (values) => {
    values.tech = values.tech.join(",");
    const newValues = { ...data, ...values };

    const equalCheck = isObjectEqual(data, newValues);
    if (equalCheck && !selectImage) {
      onCloseFunc();
      return;
    }

    let imageUrl;
    if (selectImage) {
      const uid = `${values.name}_${shortid.generate()}`;
      const file = base64toFile(selectImage, uid);
      const storageRef = sRef(storage, `/thumb/${uid}`);
      imageUrl = await uploadBytes(storageRef, file).then((res) => {
        const url = getDownloadURL(res.ref);
        return url;
      });
      const oldImageRef = sRef(storage, data.image);
      deleteObject(oldImageRef)
        .then(() => {})
        .catch((error) => console.error(error));
    }
    update(ref(db, `workListData/${data.uid}`), {
      ...values,
      image: imageUrl ? imageUrl : data.image,
    })
      .then((res) => {
        onRender();
        toast({
          description: "수정되었습니다.",
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

  const onRemoveProject = () => {
    const agree = confirm("삭제 하시겠습니까?");
    if (!agree) return;
    const oldImageRef = sRef(storage, data.image);
    deleteObject(oldImageRef)
      .then(() => {})
      .catch((error) => console.error(error));
    remove(ref(db, `workListData/${data.uid}`))
      .then(() => {
        toast({
          description: "삭제되었습니다.",
          status: "success",
          duration: 1000,
          isClosable: false,
        });
        onCloseFunc();
        onRender();
      })
      .catch((error) => console.error(error));
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
              <Image src={selectImage ? selectImage : data.image} />
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
                  position: "absolute",
                  left: "10px",
                  bottom: "10px",
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
                이미지 수정
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
                      <FormLabel>tech</FormLabel>
                      <Textarea mb={3} {...field} placeholder="tech" />
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
                <Flex mt={2}>
                  <Button
                    flex={2}
                    mr={2}
                    width="100%"
                    colorScheme="blue"
                    type="submit"
                  >
                    수정
                  </Button>
                  <Button
                    flex={1}
                    width="100%"
                    colorScheme="red"
                    onClick={onRemoveProject}
                  >
                    삭제
                  </Button>
                </Flex>
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
