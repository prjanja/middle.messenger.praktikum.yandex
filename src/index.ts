import Handlebars from "handlebars";
import "./style.less";
import * as Pages from "./pages";
import * as Components from "./components";

const container = document.getElementById("app")!;
const LOGIN_PAGE = "Login";
const pageContext = {
  Feed: {
    chats: [
      {
        id: "111",
        title: "Андрей",
        date: "10:15",
        avatar: "/avatar.svg",
        lastMessage: "Изображение",
        notification: 2,
      },
      {
        id: "222",
        title: "Киноклуб",
        date: "10:15",
        avatar: "/avatar.svg",
        lastMessage: "стикер",
        notification: 0,
      },
      {
        id: "333",
        title: "Илья",
        date: "10:15",
        avatar: "/avatar.svg",
        lastMessage:
          "Друзья, у меня для вас особенный выпуск новостей! Длинное сообщение, которое не помещается и нужны элипсы",
        notification: 0,
      },
    ],
  },
  Profile: {
    avatar: "/avatar.svg",
  },
};

let setHash = (hash: string) => {
  window.location.hash = hash;
};

function navigate(page: string) {
  if (page.startsWith("#")) {
    page = page.slice(1);
  }
  //@ts-ignore
  let currentPage = Pages[page] || Pages.NotFound;
  if (currentPage) {
    //@ts-ignore
    let text = Handlebars.compile(currentPage)(pageContext[page] || {});

    container.innerHTML = text;
  }
}

function locationHashChanged() {
  navigate(location.hash);
}

window.onhashchange = locationHashChanged;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash.slice(1) !== LOGIN_PAGE) {
    setHash(LOGIN_PAGE);
  } else {
    navigate(LOGIN_PAGE);
  }
});
