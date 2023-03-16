import axios from 'axios';

export const upload = (img) => {
  let body = new FormData();
  body.set('key', '85a2c11c4365a879e0ce9ffa4cc0b8d4');
  body.append('image', img);
  return axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body,
  });
};
