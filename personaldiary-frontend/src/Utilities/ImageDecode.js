async function decodeBase64(list) {
  var images = [];
  console.log(list);
  if (list === undefined) {
    return [];
  }

  for (var item of list) {
    const byteCharacters = atob(item);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset++) {
      const byte = byteCharacters.charCodeAt(offset);
      byteArrays.push(byte);
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: "image/png" });

    const imageUrl = URL.createObjectURL(blob);
    images.push(imageUrl);
  }
  return images;
}

export default decodeBase64;
