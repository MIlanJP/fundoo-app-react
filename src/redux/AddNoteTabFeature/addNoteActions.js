import * as actions from "./addNoteType";

export function addNoteBeforeClick() {
  return {
    type: actions.ADDNOTE_BEFORE_CLICK,
  };
}
export function addNoteAfterClick() {
  return {
    type: actions.ADDNOTE_AFTER_CLICK,
  };
}
