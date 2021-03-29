import { GET_NOTE_BY_ID } from "../types";

type Actions = {
  type: typeof GET_NOTE_BY_ID;
  note: any;
};

const initState = {
  notes: [],
  note: null,
  share: null,
  createdNote: {},
  loading: false,
  tempNoteId: null,
};

export default function NoteReducer(state = initState, action: Actions) {
  switch (action.type) {
    case "GET_NOTE_BY_ID": {
      return {
        ...state,
        note: action.note,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
