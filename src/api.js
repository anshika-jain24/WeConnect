const newRoomEndpoint =
  `${window.location.origin}/api/rooms`;


async function createRoom(name) {

  // console.log(process.env.API_KEY);

  console.log(name);

  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    "properties":{
        "enable_network_ui":false,
        "enable_chat": true,
        "enable_screenshare": true
    },
    "name":name,
    "privacy":"public"
};
  let response = await fetch('https://api.daily.co/v1/rooms', {
    method: "POST",
    headers: {
      "Authorization" : `Bearer 8ee0f778cd6f29ffd583858cad7fd499df1aa6c102456b828bf5bad43183923f`
    },
    body: JSON.stringify(options),
    mode: 'cors',
  }),
    room = await response.json();
    console.log(room)
  return room;

}



export default { createRoom };
