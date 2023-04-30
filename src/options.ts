interface YTShortcutsTable {
  home: string;
  togglePlayerFocus: string;
  thumbForwards: string;
  thumbBackwards: string;
  thumbGo: string;
  like: string;
  dislike: string;
}

const defaultShortcuts: YTShortcutsTable = {
  home: "q",
  togglePlayerFocus: "\\",
  like: "W",
  dislike: "E",
  thumbForwards: "A",
  thumbBackwards: "S",
  thumbGo: "Enter",
};

async function initialSetup() {
  const homeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="home"]')!;
  homeShortcutInput.value = (await chrome.storage.sync.get("home")).home;

  const togglePlayerFocusShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="toggle-player-focus"]')!;
  togglePlayerFocusShortcutInput.value = (
    await chrome.storage.sync.get("togglePlayerFocus")
  ).togglePlayerFocus;

  const thumbForwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="forwards"]'
  )!;
  thumbForwardsInput.value = (
    await chrome.storage.sync.get("thumbForwards")
  ).thumbForwards;
  const thumbBackwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="backwards"]'
  )!;
  thumbBackwardsInput.value = (
    await chrome.storage.sync.get("thumbBackwards")
  ).thumbBackwards;
  const thumbGoInput: HTMLInputElement = document.body.querySelector(
    'input[name="go-into-thumb-video"]'
  )!;
  thumbGoInput.value = (await chrome.storage.sync.get("thumbGo")).thumbGo;

  const likeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="like"]')!;
  likeShortcutInput.value = (await chrome.storage.sync.get("like")).like;
  const dislikeShortcutInput: HTMLInputElement = document.body.querySelector(
    'input[name="dislike"]'
  )!;
  dislikeShortcutInput.value = (
    await chrome.storage.sync.get("dislike")
  ).dislike;
}

document.addEventListener("DOMContentLoaded", () => {
  initialSetup();

  const settingsForm: HTMLFormElement = document.body.querySelector("form")!;

  settingsForm.onsubmit = (e) => {
    e.preventDefault();

    const homeShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="home"]')!;

    const togglePlayerFocusShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="toggle-player-focus"]')!;

    const thumbForwardsInput: HTMLInputElement = document.body.querySelector(
      'input[name="forwards"]'
    )!;
    const thumbBackwardsInput: HTMLInputElement = document.body.querySelector(
      'input[name="backwards"]'
    )!;
    const thumbGoInput: HTMLInputElement = document.body.querySelector(
      'input[name="go-into-thumb-video"]'
    )!;

    const likeShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="like"]')!;
    const dislikeShortcutInput: HTMLInputElement = document.body.querySelector(
      'input[name="dislike"]'
    )!;

    chrome.storage.sync.set(<YTShortcutsTable>{
      home: homeShortcutInput.value,
      togglePlayerFocus: togglePlayerFocusShortcutInput.value,
      like: likeShortcutInput.value,
      dislike: dislikeShortcutInput.value,
      thumbForwards: thumbForwardsInput.value,
      thumbBackwards: thumbBackwardsInput.value,
      thumbGo: thumbGoInput.value,
    });
  };
});
