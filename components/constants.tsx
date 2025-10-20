import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const HORIZONTAL_PADDING = SCREEN_WIDTH * 0.025;
export const FRAME_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
export const FRAME_HEIGHT = SCREEN_HEIGHT * 0.48;
export const FRAME_TOP = SCREEN_HEIGHT * 0.18;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
