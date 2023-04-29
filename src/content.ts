///////////////////////////////////////////////////////////////////////////////
// Entry Point

export enum Shortcuts {
  Home = "q",
  TogglePlayerFocus = "\\",
  Like = "W",
  Dislike = "E",
  ThumbForwards = "A",
  ThumbBackwards = "S",
  ThumbGo = "Enter",
}

document.body.addEventListener("keydown", (event) => {
  switch (event.key) {
    case Shortcuts.Home:
      home();
      break;
    case Shortcuts.TogglePlayerFocus:
      togglePlayerFocus();
      break;
    case Shortcuts.Like:
      like();
      break;
    case Shortcuts.Dislike:
      dislike();
      break;
    case Shortcuts.ThumbForwards:
      thumbnailsMove(true);
      break;
    case Shortcuts.ThumbBackwards:
      thumbnailsMove(false);
      break;
    case Shortcuts.ThumbGo:
      event.ctrlKey ? thumbGo(true) : thumbGo(false)
      break;
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

const playerDiv = document.querySelector("#movie_player") as HTMLDivElement;
if (playerDiv) {
  playerDiv.addEventListener('blur', (_) => decorateUnfocusedPlayer());
  playerDiv.addEventListener('focus', () => decorateFocusedPlayer());
}

function togglePlayerFocus() {
  const playerDiv = document.querySelector("#movie_player") as HTMLDivElement;

  if (playerDiv) 
    document.activeElement === playerDiv ? playerDiv.blur() : playerDiv.focus();
}

function decorateFocusedPlayer() {
  const playerDiv = document.querySelector("#movie_player") as HTMLDivElement;
  
  if (playerDiv) {
    playerDiv.style.borderBottom = "#FF8C00 solid";
    playerDiv.style.borderWidth = "0.5px";
  }
}

function decorateUnfocusedPlayer() {
  const playerDiv = document.querySelector("#movie_player") as HTMLDivElement;

  if (playerDiv) {
    playerDiv.style.borderBottom = "#483D8B solid";
    playerDiv.style.borderWidth = "0.5px";
  }
}

///////////////////////////////////////////////////////////////////////////////
// Like & Dislike

function like() {
  const likeButton: HTMLButtonElement = document.querySelector('#segmented-like-button > ytd-toggle-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill')!;
  likeButton!.click();
}

function dislike() {
  const dislikeButton: HTMLButtonElement = document.querySelector('#segmented-dislike-button > ytd-toggle-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill')!;
  dislikeButton!.click();
}

///////////////////////////////////////////////////////////////////////////////
// Thumbnails

let currentThumbnailIndex = -1;
let currentThumbnailAnchor: HTMLAnchorElement;

function calcPrevIndex(forwards: boolean = true) {
  if (forwards && currentThumbnailIndex >= 0) {
    return currentThumbnailIndex - 1
  } else if (!forwards && currentThumbnailIndex >= -1) {
    return currentThumbnailIndex + 1
  } else return -1;
}

function thumbnailsMove(forwards: boolean = true) {
  const thumbnails = document.querySelectorAll("ytd-rich-grid-media");

  forwards ? currentThumbnailIndex++ : (currentThumbnailIndex === -1 ? null : currentThumbnailIndex--);

  const prevIndex = calcPrevIndex(forwards);

  if (prevIndex > -1) {
    const prevThumbnail = thumbnails[prevIndex] as HTMLElement;
    prevThumbnail.style.outline = '';
  }

  if (currentThumbnailIndex >= 0) {
    const currentThumbnail = thumbnails[currentThumbnailIndex] as HTMLElement
    currentThumbnail.style.outline = 'red solid';
    currentThumbnail.focus();

    currentThumbnailAnchor = currentThumbnail.querySelector('a') as HTMLAnchorElement;
  }
}

function thumbGo(ctrl: boolean = false) {
  if (currentThumbnailAnchor) {
    const link = currentThumbnailAnchor.href;
    ctrl ? window.open(link, '_blank', 'noreferrer') : window.location.href = link;
  }
}

///////////////////////////////////////////////////////////////////////////////
