const getAppId = "UT0vpKlsx8hbbbeuzzTd";
const nameValue = document.querySelector(".inputname");
const commentValue = document.querySelector(".comment-reservation");
const btn = document.querySelector(".reservation-btn");

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

async function showReservation() {
     const name = nameValue.value;
     const comment = commentValue.value;
   
     try {
       const postResponse = await reservationPostRequest(name, comment);
       localStorage.setItem("postResponse", postResponse);
       const response = await reservationGetRequest();
       console.log(response);
     } catch (err) {
       console.error(err);
     }
   }

btn.addEventListener("click", showReservation);

//export {reservationGetRequest, reservationPostRequest};