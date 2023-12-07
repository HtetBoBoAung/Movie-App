const container = document.querySelector(".container");

async function getData (){
     try {
          const response = await axios.get('https://api.tvmaze.com/shows');
          return response.data;
     } catch (error) {
          console.error(error);
     }
}

async function displayFunction() {
     try {
          const data = await getData();
          data.forEach((item) => {
               const cardList = document.createElement("article");
               cardList.className = "card-container";
               cardList.innerHTML = `
               <div class="img-div">
               <img src=${item.image.medium} alt="" class="image">
          </div>
     
          <div class="info-div">
               <h2 class="info-title">${item.name}</h2>
     
          <ul class="model-list">
            ${item.genres.map((genre) => `<p class="model-item">${genre}</p>`).join('')}
          </ul>
     
          <ul class="comment-section">
               <button class="comment-box">Comments</button>
     
               <li class="like-list">
               <i class="fa-solid fa-heart"></i>
                    <p id="like-number">0</p>
               </li>

               <button class="reservation-btn">Reservation</button>
          </ul>
          </div>`
          container.append(cardList);
          });
     }
     catch(e){
          console.error(e);
     }
     
}

window.addEventListener("DOMContentLoaded", displayFunction);