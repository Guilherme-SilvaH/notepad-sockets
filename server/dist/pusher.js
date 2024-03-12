"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pusher_1 = __importDefault(require("pusher"));
const pusher = new pusher_1.default({
    appId: "1770347",
    key: "1e584492a40c7b198231",
    secret: "195aae952afe0ff01ea0",
    cluster: "us2",
    useTLS: true,
});
exports.default = pusher;
