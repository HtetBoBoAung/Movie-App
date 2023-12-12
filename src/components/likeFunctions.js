async function postRequest(id) {
     try {
       const postresult = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/likes/`, {
         item_id: id,
       });
       console.log(postresult);
     } catch (e) {
       console.error(e);
     }
   }
   
   async function getRequest(id) {
     try {
       const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/likes/`);
       const likeData = response.data.filter((like) => like.item_id === id);
       console.log(likeData.length);
       return likeData.length;
     } catch (error) {
       console.error(error);
     }
   }

export {postRequest, getRequest};