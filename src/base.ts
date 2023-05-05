 export interface YTShortcutsTable {
  home: string;
  togglePlayerFocus: string;
  thumbForwards: string;
  thumbBackwards: string;
  thumbGo: string;
  like: string;
  dislike: string;
  copyUrl: string;
}

 export const defaultShortcuts: YTShortcutsTable = {
  home: "q",
  togglePlayerFocus: "\\",
  like: "W",
  dislike: "E",
  thumbForwards: "A",
  thumbBackwards: "S",
  thumbGo: "Enter",
  copyUrl: "B",
};
