// TODO: add a shortcut for clipboarding the current video link (or thumbnail's)
///////////////////////////////////////////////////////////////////////////////
// Entry Point

import { YTShortcutsTable } from "./options";

// TODO: Test this
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

function like() {
  const likeButton: HTMLButtonElement = document.querySelector(
    "#segmented-like-button > ytd-toggle-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
  )!;
  likeButton!.click();
}

function dislike() {
  const dislikeButton: HTMLButtonElement = document.querySelector(
    "#segmented-dislike-button > ytd-toggle-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
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
  // TODO: Add more tags from the previous project...
  const tag = window.location.pathname.includes("results")
    ? "ytd-video-renderer"
    : "ytd-rich-item-renderer";
  const thumbnails = document.querySelectorAll(tag);

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

function thumbGo(ctrl: boolean = false) {
  if (currentThumbnailAnchor) {
    const link = currentThumbnailAnchor.href;
    ctrl
      ? window.open(link, "_blank", "noreferrer")
      : (window.location.href = link);
  }
}

///////////////////////////////////////////////////////////////////////////////
