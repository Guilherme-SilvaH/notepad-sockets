import Pusher from 'pusher'


const pusher = new Pusher({
    appId: "1770347",
    key: "1e584492a40c7b198231",
    secret: "195aae952afe0ff01ea0",
    cluster: "us2",
    useTLS: true,
  });


export default pusher