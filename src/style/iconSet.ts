import { Fonts } from "./typography";

const types = {
  solid: Fonts.IconSetSolid,
  outline: Fonts.IconSetOutline,
};

const sizes = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 64,
};

const names = [
  "actions",
  "actions-horizontal",
  "addresses",
  "apple",
  "archive",
  "assistent",
  "bike",
  "briefcase",
  "calendar",
  "camera",
  "cashier",
  "checkmark",
  "chevron-down",
  "chevron-right",
  "chevron-left",
  "chevron-up",
  "clock",
  "close",
  "coffee",
  "compass",
  "dashboard",
  "do-not-disturb",
  "document",
  "download",
  "education",
  "email",
  "facebook",
  "favorite",
  "filter",
  "free-cancellation",
  "help",
  "hide",
  "hotel",
  "id-card",
  "information",
  "internet",
  "key",
  "kids-club",
  "label",
  "language",
  "like",
  "lock-edit",
  "logout",
  "mail-edit",
  "map",
  "messages",
  "minus",
  "nights",
  "notification-alert",
  "notification",
  "overview-home",
  "people",
  "person",
  "phone",
  "picture",
  "plus",
  "present",
  "print",
  "privacy",
  "profile",
  "qr-code",
  "receipt",
  "reload",
  "report",
  "restaurant",
  "room",
  "roomservice",
  "savings",
  "search",
  "settings",
  "shoppingbag",
  "show",
  "star",
  "suitcase-label",
  "suitcase",
  "tasks",
  "update",
  "voucher",
  "wallet",
  "dislike",
  "placeholder",
  "review",
  "table",
  "warning",
] as const;

const IconSet = {
  names,
  sizes,
  types,
};

export default IconSet;
