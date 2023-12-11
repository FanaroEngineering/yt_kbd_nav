import { YTShortcutsTable } from "./utils"

// Don't know if it's possible to export this without modules.
// @ts-ignore
const defaultShortcuts: YTShortcutsTable = {
  home: "q",
  togglePlayerFocus: "\\",
  like: "W",
  dislike: "E",
  thumbForwards: "A",
  thumbBackwards: "S",
  thumbGo: "Enter",
  copyUrl: "B",
  displayTime: ";",
}

async function initialSetup() {
  // Don't know how to make TS recognize `chrome`...
  // @ts-ignore
  const shortcuts: YTShortcutsTable = await chrome.storage.sync.get()

  const displayTimeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="display-time"]')!
  displayTimeShortcutInput.value =
    shortcuts.displayTime || defaultShortcuts.displayTime

  const homeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="home"]')!
  homeShortcutInput.value = shortcuts.home || defaultShortcuts.home

  const copyVideoUrlShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="copy-video-url"]')!
  copyVideoUrlShortcutInput.value =
    shortcuts.copyUrl || defaultShortcuts.copyUrl

  const togglePlayerFocusShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="toggle-player-focus"]')!
  togglePlayerFocusShortcutInput.value =
    shortcuts.togglePlayerFocus || defaultShortcuts.togglePlayerFocus

  const thumbForwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="forwards"]'
  )!
  thumbForwardsInput.value =
    shortcuts.thumbForwards || defaultShortcuts.thumbForwards
  const thumbBackwardsInput: HTMLInputElement = document.body.querySelector(
    'input[name="backwards"]'
  )!
  thumbBackwardsInput.value =
    shortcuts.thumbBackwards || defaultShortcuts.thumbBackwards
  const thumbGoInput: HTMLInputElement = document.body.querySelector(
    'input[name="go-into-thumb-video"]'
  )!
  thumbGoInput.value = shortcuts.thumbGo || defaultShortcuts.thumbGo

  const likeShortcutInput: HTMLInputElement =
    document.body.querySelector('input[name="like"]')!
  likeShortcutInput.value = shortcuts.like || defaultShortcuts.like
  const dislikeShortcutInput: HTMLInputElement = document.body.querySelector(
    'input[name="dislike"]'
  )!
  dislikeShortcutInput.value = shortcuts.dislike || defaultShortcuts.dislike
}

document.addEventListener("DOMContentLoaded", () => {
  initialSetup()

  const settingsForm: HTMLFormElement = document.body.querySelector("form")!

  settingsForm.onsubmit = (e) => {
    e.preventDefault()

    const homeShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="home"]')!

    const copyVideoUrlShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="copy-video-url"]')!

    const displayTimeShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="display-time"]')!

    const togglePlayerFocusShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="toggle-player-focus"]')!

    const thumbForwardsInput: HTMLInputElement = document.body.querySelector(
      'input[name="forwards"]'
    )!
    const thumbBackwardsInput: HTMLInputElement = document.body.querySelector(
      'input[name="backwards"]'
    )!
    const thumbGoInput: HTMLInputElement = document.body.querySelector(
      'input[name="go-into-thumb-video"]'
    )!

    const likeShortcutInput: HTMLInputElement =
      document.body.querySelector('input[name="like"]')!
    const dislikeShortcutInput: HTMLInputElement = document.body.querySelector(
      'input[name="dislike"]'
    )!

    // @ts-ignore Don't know how to make TS recognize `chrome`
    chrome.storage.sync.set(<YTShortcutsTable>{
      home: homeShortcutInput.value,
      togglePlayerFocus: togglePlayerFocusShortcutInput.value,
      like: likeShortcutInput.value,
      dislike: dislikeShortcutInput.value,
      thumbForwards: thumbForwardsInput.value,
      thumbBackwards: thumbBackwardsInput.value,
      thumbGo: thumbGoInput.value,
      copyUrl: copyVideoUrlShortcutInput.value,
      displayTime: displayTimeShortcutInput.value,
    })
  }
})
