const getAppId = "UT0vpKlsx8hbbbeuzzTd";

async function CommentPostRequest(id, name, text) {
     try {
       const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/comments/`, {
        item_id: id,
         username: name,
         comment: text,
       });
       localStorage.setItem(response,"response");
       return response;
      
      
     } catch (e) {
       console.error(e);
     }
   }
   
   async function commentGetRequest(id) {
     try {
         const requestReponse = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UT0vpKlsx8hbbbeuzzTd/comments?item_id=${id}`);
         console.log(requestReponse.data);
     } catch (error) {
         console.error(error.response);
     }
   }

export {CommentPostRequest, commentGetRequest};