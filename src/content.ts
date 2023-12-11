import { YTShortcutsTable } from "./utils"

// TODO: Cycling through the thumbnails doesn't focus
// TODO: When clicking on a thumbnail, check that there are no other active elements
///////////////////////////////////////////////////////////////////////////////
// 0. Entry Point

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
}

function noInputFocus() {
  const commentBoxQuery = "yt-formatted-string.ytd-commentbox > div"

  const inputBoxes = [
    document.querySelector("input#search"),
    document.querySelector("iron-input > input"),
    document.querySelectorAll(commentBoxQuery)[0],
    document.querySelectorAll(commentBoxQuery)[1],
  ]

  return (
    inputBoxes.every((el) => el !== document.activeElement) &&
    !(document.activeElement instanceof HTMLInputElement)
  )
}

document.body.addEventListener("keydown", async (e) => {
  // Don't know how to make TS recognize `chrome`...
  // @ts-ignore
  const currentShortcuts: YTShortcutsTable = await chrome.storage.sync.get()

  const homeShortcut = currentShortcuts.home || defaultShortcuts.home
  const togglePlayerFocusShortcut =
    currentShortcuts.togglePlayerFocus || defaultShortcuts.togglePlayerFocus
  const likeShortcut = currentShortcuts.like || defaultShortcuts.like
  const dislikeShortcut = currentShortcuts.dislike || defaultShortcuts.dislike
  const thumbForwardsShortcut =
    currentShortcuts.thumbForwards || defaultShortcuts.thumbForwards
  const thumbBackwardsShortcut =
    currentShortcuts.thumbBackwards || defaultShortcuts.thumbBackwards
  const thumbGoShortcut = currentShortcuts.thumbGo || defaultShortcuts.thumbGo
  const copyUrlShortcut = currentShortcuts.copyUrl || defaultShortcuts.copyUrl

  if (noInputFocus()) {
    switch (e.key) {
      case homeShortcut:
        home()
        break
      case togglePlayerFocusShortcut:
        togglePlayerFocus()
        break
      case likeShortcut:
        like()
        break
      case dislikeShortcut:
        dislike()
        break
      case thumbForwardsShortcut:
        thumbnailsMove(true)
        break
      case thumbBackwardsShortcut:
        thumbnailsMove(false)
        break
      case thumbGoShortcut:
        e.ctrlKey || e.metaKey ? thumbGo(true) : thumbGo(false)
        break
      case copyUrlShortcut:
        await copyVideoUrl()
        break
    }
  }
})

///////////////////////////////////////////////////////////////////////////////
// 1. Home Shortcut

function home() {
  const logoIcon = document.querySelector("yt-icon") as HTMLButtonElement
  logoIcon.click()
}

///////////////////////////////////////////////////////////////////////////////
// 2. Video Player

function getMoviePlayer() {
  return document.querySelector("#movie_player") as HTMLDivElement
}

const playerDiv = getMoviePlayer()
if (playerDiv) {
  playerDiv.addEventListener("blur", () => decorateUnfocusedPlayer())
  playerDiv.addEventListener("focus", () => decorateFocusedPlayer())
}

function togglePlayerFocus() {
  const playerDiv = getMoviePlayer()

  if (playerDiv)
    document.activeElement === playerDiv ? playerDiv.blur() : playerDiv.focus()
}

function decorateFocusedPlayer() {
  const playerDiv = getMoviePlayer()

  if (playerDiv) {
    playerDiv.style.borderBottom = "#FF8C00 solid"
    playerDiv.style.borderWidth = "0.5px"
  }
}

function decorateUnfocusedPlayer() {
  const playerDiv = getMoviePlayer()

  if (playerDiv) {
    playerDiv.style.borderBottom = "#483D8B solid"
    playerDiv.style.borderWidth = "0.5px"
  }
}

///////////////////////////////////////////////////////////////////////////////
// 3. Like & Dislike

function likeQuery(isShorts: boolean = false, like: boolean = true) {
  return isShorts
    ? `
      #${like ? "" : "dis"}like-button > 
      yt-button-shape > 
      label > 
      button > 
      yt-touch-feedback-shape > 
      div > 
      div.yt-spec-touch-feedback-shape__fill
    `
    : `
      #top-level-buttons-computed > 
      segmented-like-dislike-button-view-model > 
      yt-smartimation > 
      div > 
      div > 
      ${like ? "" : "dis"}like-button-view-model > 
      toggle-button-view-model > 
      button > 
      yt-touch-feedback-shape > 
      div > 
      div.yt-spec-touch-feedback-shape__fill
    `
}

function like() {
  const isShorts = window.location.pathname.includes("shorts")
  const likeButton: HTMLButtonElement = document.querySelector(
    likeQuery(isShorts)
  )!
  likeButton!.click()
}

function dislike() {
  const isShorts = window.location.pathname.includes("shorts")
  const dislikeButton: HTMLButtonElement = document.querySelector(
    likeQuery(isShorts, false)
  )!
  dislikeButton!.click()
}

///////////////////////////////////////////////////////////////////////////////
// 4. Thumbnails

let currentThumbnailIndex = -1
let currentThumbnailAnchor: HTMLAnchorElement

function calcPrevIndex(forwards: boolean = true) {
  if (forwards && currentThumbnailIndex >= 0) {
    return currentThumbnailIndex - 1
  } else if (!forwards && currentThumbnailIndex >= -1) {
    return currentThumbnailIndex + 1
  } else return -1
}

function thumbnailsMove(forwards: boolean = true) {
  const tags = getTags(window.location.href)
  const thumbnails = document.querySelectorAll(tags)

  forwards
    ? currentThumbnailIndex++
    : currentThumbnailIndex === -1
    ? null
    : currentThumbnailIndex--

  const prevIndex = calcPrevIndex(forwards)

  if (prevIndex > -1) {
    const prevThumbnail = thumbnails[prevIndex] as HTMLElement
    prevThumbnail.style.outline = ""
  }

  if (currentThumbnailIndex >= 0) {
    const currentThumbnail = thumbnails[currentThumbnailIndex] as HTMLElement
    currentThumbnail.style.outline = "red solid"
    currentThumbnail.focus()

    currentThumbnailAnchor = currentThumbnail.querySelector(
      "a"
    )! as HTMLAnchorElement
  }
}

type UrlString = string

const watchTags = `
  ytd-compact-video-renderer, 
  ytd-compact-radio-renderer, 
  ytd-compact-playlist-renderer, 
  ytd-compact-movie-renderer
`
const historyTags = "ytd-thumbnail, ytd-video-renderer"
const resultsTags = `
  ytd-video-renderer, 
  ytd-radio-renderer, 
  ytd-playlist-renderer, 
  ytd-channel-renderer
`
const homeTags = "ytd-rich-item-renderer"
const channelTags = `
  ytd-rich-item-renderer, 
  ytd-video-renderer, 
  ytd-grid-video-renderer, 
  ytd-channel-video-renderer, 
  ytd-playlist-renderer, 
  ytd-grid-channel-renderer
`
const playlistTags = "ytd-playlist-video-renderer"

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
    : homeTags
}

function thumbGo(ctrl: boolean = false) {
  if (currentThumbnailAnchor) {
    const link = currentThumbnailAnchor.href
    ctrl ? window.open(link, "_blank") : (window.location.href = link)
  }
}

///////////////////////////////////////////////////////////////////////////////
// 5. Copy Video URL

function shortenLink(url: UrlString) {
  const splitLink = url.split("watch?v=")
  const videoId = splitLink[1]

  return `https://youtu.be/${videoId}`
}

async function copyVideoUrl() {
  const url: UrlString = window.location.href
  await window.navigator.clipboard.writeText(shortenLink(url))
}

///////////////////////////////////////////////////////////////////////////////
