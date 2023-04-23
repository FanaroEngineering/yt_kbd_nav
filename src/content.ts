enum Shortcuts {
  ThumbForwards = "a",
  ThumbBackwards = "s",
  Home = "q",
  TogglePlayerFocus = "\\",
}

const thumbnailIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll("ytd-thumbnail");

  console.log(thumbnails);
});

document.body.addEventListener("keydown", (event) => {
  switch (event.key) {
    case Shortcuts.Home:
      home();
      break;
    case Shortcuts.TogglePlayerFocus:
      togglePlayerFocus();
      break;
    case Shortcuts.ThumbForwards:
      // TODO
      break;
    case Shortcuts.ThumbBackwards:
      // TODO
      break;
  }
});

function home() {
  const logoIcon = document.querySelector("yt-icon") as HTMLButtonElement;
  logoIcon.click();
}

function togglePlayerFocus() {
  const playerDiv = document.querySelector("#movie_player") as HTMLDivElement;

  if (playerDiv) {
    if (document.activeElement === document.body) {
      playerDiv.style.borderBottom = "#483D8B solid";
      playerDiv.style.borderWidth = "0.5px";
    } else {
      playerDiv.style.borderBottom = "#FF8C00 solid";
      playerDiv.style.borderWidth = "0.5px";
    }
  }
}

// TODO: Like, dislike buttons
// TODO: Setting quality of the video