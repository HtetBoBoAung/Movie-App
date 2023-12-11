const container = document.querySelector(".container");
const commentContainer = document.querySelector(".comment-wrapper");
const comPopUp = document.querySelector(".comment-popup");
const getAppId = "UT0vpKlsx8hbbbeuzzTd";

async function getData() {
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
    data.forEach((item, index) => {
      let { name, image, genres } = item;
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
              <i class="fa-solid fa-heart" data-set=${item.id}></i>
              <p class="like-number">0</p>
            </li>

            <button class="reservation-btn">Reservation</button>
          </ul>
        </div>`;
      container.append(cardList);

      // comment section
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

            <div class="userComment-div"></div>

            <form class="comment-form">
              <h2 class="comment-form-title">Comments</h2>

              <input type="text" placeholder="Name" class="inputname">
              <textarea placeholder="Type comment here.." id="" cols="30" rows="10" class="comment"></textarea>
              <button class="submit-btn">Submit</button>
            </form>

          </div>

          <button class="close-btn">X</button>
        `;
        commentContainer.append(popUpcard);

        // btn section
        const closeBtn = popUpcard.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
          commentContainer.classList.remove("display");
          popUpcard.remove();
        });
      });

      const btn = cardList.querySelector(".fa-heart");
      const numberDisplay = cardList.querySelector(".like-number");

      btn.addEventListener("click", async (e) => {
        let itemId = e.target.dataset.set;
        await postRequest(itemId);
        const likeCount = await getRequest(itemId);
        numberDisplay.textContent = likeCount;
      });

//showComment 

      const usernames = document.querySelector(".inputname");
      const userComments = document.querySelector(".comment");
      const submitBtn = document.querySelector(".submit-btn");
      const userCommentDiv = document.querySelector(".userComment-div");
      const commentsList = document.createElement("div");
      
    });
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener("DOMContentLoaded", displayFunction);

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

async function CommentPostRequest(id, name, text) {
  try {
    const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppId}/comments/`, {
      item_id: id,
      username: name,
      comment: text,
    });
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}


displayFunction();
