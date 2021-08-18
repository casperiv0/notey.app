export type ALLOWED_METHODS = "PATCH" | "PUT" | "DELETE" | "OPTIONS" | "GET" | "POST";
export const ALLOWED_METHODS = ["PATCH", "PUT", "DELETE", "OPTIONS", "GET", "POST"];

export enum Cookie {
  Expires = 60 * 60 * 1000 * 6, // 6 hours
  RememberMeExpires = 60 * 60 * 1000 * 24 * 30, // 30 days
}

export const LOCKED_NOTE_MSG =
  "Note is locked with a PIN code. Please enter your pincode in the popup";

export const NO_ERROR = "An unexpected error occurred.";

export enum Size {
  SidebarFull = "300px",
  Sidebar = "100px",
  DefaultMinWidth = "960px",
}

export enum Styles {
  BorderRadius = "0.3rem",
}

export enum ModalIds {
  OptionsModal = "optionsModal",
  ManageNoteModal = "manageNoteModal",
  CreateNoteModal = "createNoteModal",
  CreateCategoryModal = "createCategoryModal",
  AlertModal = "alertModal",
  EditCategory = "editCategoryModal",
  AlertDeleteAccount = "alertModal_deleteAccount",
  AlertDeleteNote = "alertModal_deleteNote",
  AlertUnsavedChanges = "alertModal_unsavedChanges",
  AlertDeleteCategory = "alertModal_deleteCategory",
  AlertTooManyRequests = "alertModal_tooManyRequests",
  PinRequired = "pinRequiredModal",
  ChangePin = "changePinModal",
}

export enum NoteyColors {
  Dark = "#18191A",
  Red = "#d9534f",
  White = "#ffffff",

  Text = "#f2f2f2",

  DarkerGray = "#242526",
  DarkGray = "#2F2F2F",
  LightGray = "#3A3B3C",
}
