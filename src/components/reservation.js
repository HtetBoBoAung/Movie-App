const getAppId = "UT0vpKlsx8hbbbeuzzTd";

async function reservationPostRequest(name,comment) {
     try{
          const postResponse = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/reservations/`, {
               username: name,
               userComment: comment
           });
          console.log(postResponse);
     }catch(error){
          console.error(error);
     }
}

async function reservationGetRequest() {
     try{
          const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UT0vpKlsx8hbbbeuzzTd/reservations?item_id=${id}`);
         console.log(response);
     }catch(error){
          console.error(error);
     }
}

export {reservationGetRequest, reservationPostRequest};