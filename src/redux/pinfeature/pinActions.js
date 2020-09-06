import * as actions from "./pinType";

export function pinIt() {
  return {
    type: actions.PINNED,
  };
}
export function unPinIt() {
  return {
    type: actions.UNPINNED,
  };
}
