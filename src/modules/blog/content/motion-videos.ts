export interface MotionVideoEntry {
  basePath: string;
  width: number;
  height: number;
}

export const MOTION_VIDEOS = {
  "qa-agent-flow": {
    basePath: "/media/qa-agent-flow",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, MotionVideoEntry>;

export type MotionVideoKey = keyof typeof MOTION_VIDEOS;

export const MOTION_VIDEO_KEYS = Object.keys(MOTION_VIDEOS) as [
  MotionVideoKey,
  ...MotionVideoKey[],
];
