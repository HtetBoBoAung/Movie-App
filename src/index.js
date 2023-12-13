import "./style.css";
import { getData } from './components/apidata';
import { CommentPostRequest, commentGetRequest } from './components/commentFunctions';
import {postRequest, getRequest} from './components/likeFunctions';
import { reservationGetRequest, reservationPostRequest } from "./components/reservation";

const container = document.querySelector(".container");
const commentContainer = document.querySelector(".comment-wrapper");
const comPopUp = document.querySelector(".comment-popup");


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
          </ul>
        </div>`;
      container.append(cardList);


    // comment section
    const displayBtn = cardList.querySelector(".comment-box");
    displayBtn.addEventListener("click", (e) => {
    let index = e.target.dataset.index;
    const selectedItem = data[index];
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
        <button class="submit-btn" data-set=${selectedItem.id}>Submit</button>
      </form>
    </div>
    <button class="close-btn">X</button>`;
    commentContainer.append(popUpcard);
    displayComment(1);

    const usernames = document.querySelector(".inputname");
    const userComments = document.querySelector(".comment");
    const submitBtn = document.querySelector(".submit-btn");
    const btn = cardList.querySelector(".fa-heart");
    const numberDisplay = cardList.querySelector(".like-number");
    const closeBtn = popUpcard.querySelector(".close-btn");

    closeBtn.addEventListener("click", () => {
        commentContainer.classList.remove("display");
        popUpcard.remove();
    });

    btn.addEventListener("click", async (e) => {
        let itemId = e.target.dataset.set;
        await postRequest(itemId);
        const likeCount = await getRequest(itemId);
        numberDisplay.textContent = likeCount;
    });
          
    async function displayComment(selectedItem) {
      try {
        let requestReponse = await commentGetRequest(selectedItem.id);
        console.log(requestReponse);
      } catch (error) {
        console.error(error);
      }
    }

        
submitBtn.addEventListener("click", async (e) => {
    let id = e.target.dataset.set;
    let name = usernames.value;
    let comment = userComments.value;
    console.log(id, name, comment);
    const response = await CommentPostRequest(id, name, comment);
    localStorage.setItem("post request", JSON.stringify(response));
    const userCommentDiv = document.querySelector(".userComment-div");
})
  });
  });
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener("DOMContentLoaded", displayFunction);
