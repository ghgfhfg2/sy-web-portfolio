const isObjectEqual = (a, b) => {
  let check = true;
  for (const key in a) {
    if (a[key] !== b[key]) {
      check = false;
    }
  }
  return check;
};

const encodeFileToBase64 = (fileBlob: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
};

const base64toFile = (base_data, filename) => {
  const arr = base_data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export { isObjectEqual, encodeFileToBase64, base64toFile };
