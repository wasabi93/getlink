# getlink

- submit url to get download link from fshare:

  + if url already exist in db then get download link, folder name and time of last access
  + if not then get download link from fshare and create new url details in db
  
- Link taken can download from the client-side

problem: Try to get token and session_id by post login api from fshare but fail for some reason
