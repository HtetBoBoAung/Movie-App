const container = document.querySelector(".container");
const commentContainer = document.querySelector(".comment-wrapper");
const comPopUp = document.querySelector(".comment-popup");

async function getData(){
     try {
          const response = await axios.get('https://api.tvmaze.com/shows');
          localStorage.setItem("response", JSON.stringify(response));
          return response.data;
     } catch (error) {
          console.error(error);
     }
}

async function displayFunction() {
  try {
    const data = await getData();
    data.forEach((item, index) => {
      let { name, image, genres} = item;
      const cardList = document.createElement("article");
      cardList.className = "card-container";
      cardList.setAttribute("data-index", index);
      cardList.innerHTML = `
        <div class="img-div">
          <img src=${image.medium} alt="" class="image">
        </div>

        <div class="info-div">
          <h2 class="info-title">${name}</h2>

          <ul class="model-list">
            ${genres.map((genre) => `<p class="model-item">${genre}</p>`).join('')}
          </ul>

          <ul class="comment-section">
            <button class="comment-box" data-index="${index}">Comments</button>

            <li class="like-list">
              <i class="fa-solid fa-heart"></i>
              <p class="like-number">0</p>
            </li>

            <button class="reservation-btn">Reservation</button>
          </ul>
        </div>`;
      container.append(cardList);


//comment section
      const displayBtn = cardList.querySelector(".comment-box");
      displayBtn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        const selectedItem = data[index];
        console.log(selectedItem);
        commentContainer.classList.add("display");
        const popUpcard = document.createElement("div");
        popUpcard.classList = "comment-popup";
        popUpcard.innerHTML = `
          <div class="comment-image-div">
            <img src=${selectedItem.image.original} alt="" class="comment-image">
          </div>

          <div class="comments-info">
            <ul class="info-list">
              <h2 class="comment-title">${selectedItem.name}</h2>
              <li>
                ${selectedItem.genres.map((genre) => `<p class="model-item">${genre}</p>`).join('')}
              </li>

              <p class="comment-text">${selectedItem.summary}</p>

              <button class="tailer-btn">Watch Trailer</button>
            </ul>

            <form class="comment-form">
              <h2 class="comment-form-title">Comments</h2>

              <input type="text" placeholder="Name" class="inputname">
              <textarea placeholder="Type comment here.." id="" cols="30" rows="10" class="comment"></textarea>
              <button class="submit-btn">Submit</button>
            </form>

            <div class="userComment-div"></div>
          </div>

          <button class="close-btn">X</button>
        `;
        commentContainer.append(popUpcard);


//btn section
        const closeBtn = popUpcard.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
          commentContainer.classList.remove("display");
          popUpcard.remove();
        });
      });

      const btn = cardList.querySelector(".fa-heart");
      const numberDisplay = cardList.querySelector(".like-number");
      let cardLikes = parseInt(localStorage.getItem(`cardLikes_${index}`)) || 0;

      numberDisplay.textContent = cardLikes;

      btn.addEventListener("click", () => {
        cardLikes++;
        numberDisplay.textContent = cardLikes;
        localStorage.setItem(`cardLikes_${index}`, cardLikes);
      });
    });
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener("DOMContentLoaded", displayFunction);

async function postRequest() {
  const data = [
    {
        "likes": 5,
        "item_id": "item1"
    },
]
  try {
    const postresult = await axios.post("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/",data);
    console.log(postresult.data);
  } catch (e) {
    console.error(e);
  }
}

const getAppId = "UT0vpKlsx8hbbbeuzzTd"; 
async function getRequest() {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/likes/`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getRequest();

postRequest();