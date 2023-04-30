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
  const shortcuts = await chrome.storage.sync.get();

  const homeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="home"]')!;
  homeShortcutInput.value = shortcuts.home || defaultShortcuts.home;

  const togglePlayerFocusShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="toggle-player-focus"]')!;
  togglePlayerFocusShortcutInput.value =
    shortcuts.togglePlayerFocus || defaultShortcuts.togglePlayerFocus;

  const thumbForwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="forwards"]'
  )!;
  thumbForwardsInput.value = shortcuts.thumbForwards || defaultShortcuts.thumbForwards;
  const thumbBackwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="backwards"]'
  )!;
  thumbBackwardsInput.value = shortcuts.thumbBackwards || defaultShortcuts.thumbBackwards;
  const thumbGoInput: HTMLInputElement = document.body.querySelector(
    'input[name="go-into-thumb-video"]'
  )!;
  thumbGoInput.value = shortcuts.thumbGo || defaultShortcuts.thumbGo;

  const likeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="like"]')!;
  likeShortcutInput.value = shortcuts.like || defaultShortcuts.like;
  const dislikeShortcutInput: HTMLInputElement = document.body.querySelector(
    'input[name="dislike"]'
  )!;
  dislikeShortcutInput.value = shortcuts.dislike || defaultShortcuts.dislike;
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