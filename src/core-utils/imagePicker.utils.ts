import ImagePicker from 'react-native-image-crop-picker';

const openCamera = async () => {
  let response: any[] = [];
  try {
    const result = await ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    });

    if (result) {
      const res = result?.path.split('/');

      const obj = {
        name: res.length > 0 ? res[res.length - 1] : result.modificationDate,
        type: result?.mime,
        uri: result?.path,
      };
      response.push(obj);
    }
  } catch (error) {
    console.log(error);
  }

  return response;
};

const openLibrary = async () => {
  let response: any[] = [];
  try {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    });

    if (result) {
      const res = result?.path.split('/');

      const obj = {
        name: res.length > 0 ? res[res.length - 1] : result.modificationDate,
        type: result?.mime,
        uri: result?.path,
      };
      response.push(obj);
    }
  } catch (error) {
    console.log(error);
  }

  return response;
};

export { openCamera, openLibrary };
