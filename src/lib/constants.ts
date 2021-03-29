export enum Cookie {
  Expires = 60 * 60 * 1000 * 6, // 6 hours
  RememberMeExpires = 60 * 60 * 1000 * 24 * 30, // 30 days
}

export const LOCKED_NOTE_MSG =
  "Note is locked with a PIN code. Please enter your pincode in the popup";
