const newRoomEndpoint =
  `${window.location.origin}/api/rooms`;

/**
 * Create a short-lived room for demo purposes.
 *
 * It uses the redirect proxy as specified in netlify.toml`
 * This will work locally if you following the Netlify specific instructions
 * in README.md
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily REST API to create rooms and what options are available. 
 */

//  async function getURL() {

//   console.log("GET Comment!", url2);

//   axios.get(`${baseUrl}/post/comments?userName=alpha&postId=1`, {headers:{"Content-Type" : "application/json"}}) 
//   .then(function(response){
//       setComments(response.data);
//       setLoading(false);
//       console.log(response);
//   })
//   .catch(function(error){console.log("E", error)})

// }
// useEffect(() =>{
//   console.log("GETTING COMMENTS");
//   getComments();
// }, [])


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

  // Comment out the above and uncomment the below, using your own URL
  // return { url: "https://hellotesting.daily.co/anshika" };
}



export default { createRoom };
