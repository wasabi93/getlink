import axios from "axios";

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
const listData = 'http://localhost:5000/listUrl'

export const fetchAll = () => axios.get(listData)
export const createUrl = (newUrl) => axios.post(listData, newUrl)
export const updateTime = (id, newTime) => axios.patch(`${listData}/${id}`,newTime)

const getToken = 'https://cors-anywhere.herokuapp.com/https://api.fshare.vn/api/user/login'

// I have problem with cors ...

export const auth = () => axios({
  method: 'post',
  url: 'https://api.fshare.vn/api/user/login',
  header: {
    accept: 'application/json',
    User_Agent: 'getDownloadLink-QTOQKY',
    Content_Type: 'application/json'
  },
  data: {
    user_email: "email",
    password: "password",
    app_key: "key"
  }
})
// const getLink = 'https://api.fshare.vn/api/session/download'


