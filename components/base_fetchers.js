import axios from 'axios'
// import store from '../../redux/store/index.js'
// import { getAccessToken } from '@/redux/selectors/userSelectors.js'


// export async function getPaths(path) {
//   let resp = await axios.get(backend_url + path)
//   return resp['data']['paths']
// }

export async function getData(path) {
  let res = await axios.get(backend_url + path)
  return res
}

// export async function getDataAuth(path, session) {
//   let res = await axios.get(backend_url + path, {
//     headers: {
//       Authorization: `Bearer ${session.data.accessToken}`,
//     },
//   })
//   return res
// }

export async function postData(path, data) {
  let res = await axios.post(path, data)
  return res
}

// export async function postDataAuth(path, data, session) {
//   let res = await axios.post(backend_url + path, data, {
//     headers: {
//       Authorization: `Bearer ${session.data.accessToken}`,
//     },
//   })
//   return res
// }


// for meeting
// export async function getMeetingAuth(session){
//   const res = await fetch(meeting_url, {
//     method: 'GET',
//     headers: {
//       // Here you can set any headers you want
//       'Authorization': `Bearer ${session.data.accessToken}`
//     }
//   });
//   const blob = await res.blob();
//   const urlObject = URL.createObjectURL(blob);

//   return urlObject


//   // let res = await axios.get(meeting_url, {
//   //   headers: {
//   //     Authorization: `Bearer ${session.data.accessToken}`,
//   //   },
//   // })
//   // return res
// }
