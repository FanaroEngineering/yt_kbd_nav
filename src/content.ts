// TODO: add a shortcut for clipboarding the current video link (or thumbnail's)
///////////////////////////////////////////////////////////////////////////////
// Entry Point

import { YTShortcutsTable } from "./options";

function shortenLink(url: UrlString) {
  const splitLink = url.split("watch?v=");
  const videoId = splitLink[1];

  return `https://youtu.be/${videoId}`;
}

async function copyVideoUrl() {
  const url: UrlString = window.location.href;
  await window.navigator.clipboard.writeText(shortenLink(url));
}

function noInputFocus() {
  const commentBoxQuery = "yt-formatted-string.ytd-commentbox > div";

  let noInputFocus = true;

  [
    document.querySelector("input#search"),
    document.querySelector("iron-input > input"),
    document.querySelectorAll(commentBoxQuery)[0],
    document.querySelectorAll(commentBoxQuery)[1],
  ].forEach((el: Element | null) => {
    if (el == document.activeElement) noInputFocus = false;
  });

  if (document.activeElement instanceof HTMLInputElement) noInputFocus = false;

  return noInputFocus;
}

document.body.addEventListener("keydown", async (e) => {
  // TODO: If the shortcuts hadn't been updated in the options page, this won't get anything.
  // @ts-ignore Don't know how to make TS recognize `chrome`
  const currentShortcuts: YTShortcutsTable = await chrome.storage.sync.get();

  if (noInputFocus()) {
    switch (e.key) {
      case currentShortcuts.home:
        home();
        break;
      case currentShortcuts.togglePlayerFocus:
        togglePlayerFocus();
        break;
      case currentShortcuts.like:
        like();
        break;
      case currentShortcuts.dislike:
        dislike();
        break;
      case currentShortcuts.thumbForwards:
        thumbnailsMove(true);
        break;
      case currentShortcuts.thumbBackwards:
        thumbnailsMove(false);
        break;
      case currentShortcuts.thumbGo:
        e.ctrlKey ? thumbGo(true) : thumbGo(false);
        break;
      case currentShortcuts.copyUrl:
        console.log("here2")
        await copyVideoUrl();
        break;
    }
  }
});

///////////////////////////////////////////////////////////////////////////////
// Home Shortcut

function home() {
  const logoIcon = document.querySelector("yt-icon") as HTMLButtonElement;
  logoIcon.click();
}

///////////////////////////////////////////////////////////////////////////////
// Video Player

function getMoviePlayer() {
  return document.querySelector("#movie_player") as HTMLDivElement;
}

const playerDiv = getMoviePlayer();
if (playerDiv) {
  playerDiv.addEventListener("blur", () => decorateUnfocusedPlayer());
  playerDiv.addEventListener("focus", () => decorateFocusedPlayer());
}

function togglePlayerFocus() {
  const playerDiv = getMoviePlayer();

  if (playerDiv)
    document.activeElement === playerDiv ? playerDiv.blur() : playerDiv.focus();
}

function decorateFocusedPlayer() {
  const playerDiv = getMoviePlayer();

  if (playerDiv) {
    playerDiv.style.borderBottom = "#FF8C00 solid";
    playerDiv.style.borderWidth = "0.5px";
  }
}

function decorateUnfocusedPlayer() {
  const playerDiv = getMoviePlayer();

  if (playerDiv) {
    playerDiv.style.borderBottom = "#483D8B solid";
    playerDiv.style.borderWidth = "0.5px";
  }
}

///////////////////////////////////////////////////////////////////////////////
// Like & Dislike

function likeQuery(like: boolean = true) {
  return `
    #segmented-${like ? "" : "dis"}like-button > 
    ytd-toggle-button-renderer > 
    yt-button-shape > button > 
    yt-touch-feedback-shape > 
    div > 
    div.yt-spec-touch-feedback-shape__fill
  `;
}

function like() {
  const likeButton: HTMLButtonElement = document.querySelector(likeQuery())!;
  likeButton!.click();
}

function dislike() {
  const dislikeButton: HTMLButtonElement = document.querySelector(
    likeQuery(false)
  )!;
  dislikeButton!.click();
}

///////////////////////////////////////////////////////////////////////////////
// Thumbnails

let currentThumbnailIndex = -1;
let currentThumbnailAnchor: HTMLAnchorElement;

function calcPrevIndex(forwards: boolean = true) {
  if (forwards && currentThumbnailIndex >= 0) {
    return currentThumbnailIndex - 1;
  } else if (!forwards && currentThumbnailIndex >= -1) {
    return currentThumbnailIndex + 1;
  } else return -1;
}

function thumbnailsMove(forwards: boolean = true) {
  const tags = getTags(window.location.href);
  const thumbnails = document.querySelectorAll(tags);

  forwards
    ? currentThumbnailIndex++
    : currentThumbnailIndex === -1
    ? null
    : currentThumbnailIndex--;

  const prevIndex = calcPrevIndex(forwards);

  if (prevIndex > -1) {
    const prevThumbnail = thumbnails[prevIndex] as HTMLElement;
    prevThumbnail.style.outline = "";
  }

  if (currentThumbnailIndex >= 0) {
    const currentThumbnail = thumbnails[currentThumbnailIndex] as HTMLElement;
    currentThumbnail.style.outline = "red solid";
    currentThumbnail.focus();

    currentThumbnailAnchor = currentThumbnail.querySelector(
      "a"
    )! as HTMLAnchorElement;
  }
}

type UrlString = string;

const watchTags = `
  ytd-compact-video-renderer, 
  ytd-compact-radio-renderer, 
  ytd-compact-playlist-renderer, 
  ytd-compact-movie-renderer
`;
const historyTags = "ytd-thumbnail, ytd-video-renderer";
const resultsTags = `
  ytd-video-renderer, 
  ytd-radio-renderer, 
  ytd-playlist-renderer, 
  ytd-channel-renderer
`;
const homeTags = "ytd-rich-item-renderer";
const channelTags = `
  ytd-rich-item-renderer, 
  ytd-video-renderer, 
  ytd-grid-video-renderer, 
  ytd-channel-video-renderer, 
  ytd-playlist-renderer, 
  ytd-grid-channel-renderer
`;
const playlistTags = "ytd-playlist-video-renderer";

function getTags(url: UrlString) {
  return url.includes("watch")
    ? watchTags
    : url.includes("history")
    ? historyTags
    : url.includes("playlist")
    ? playlistTags
    : url.includes("results")
    ? resultsTags
    : url.match(new RegExp("/c|/channel|/user|[@]"))
    ? channelTags
    : homeTags;
}

function thumbGo(ctrl: boolean = false) {
  if (currentThumbnailAnchor) {
    const link = currentThumbnailAnchor.href;
    ctrl
      ? window.open(link, "_blank", "noreferrer")
      : (window.location.href = link);
  }
}

///////////////////////////////////////////////////////////////////////////////
