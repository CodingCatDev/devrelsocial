export interface BannerImageInput {
  editor: string;
  widgets: Widget[];
  presetId: string;
}

export interface Widget {
  data?: Data;
  type: string;
  id: DataId;
}

export interface Data {
  data?: Color;
  type?: string;
  top?: number;
  left?: number;
  size?: number;
  align?: string;
  color?: string;
  value?: string;
  weight?: string;
  gap?: number;
  limit?: number;
  order?: string;
  direction?: string;
}

export interface Color {
  colors: string[];
  rotate?: number;
}

export enum DataId {
  title = "title",
  subtitle = "subtitle",
  "followers-text" = "followers-text",
}

export enum DataType {
  text = "text",
  watermark = "watermark",
  background = "background",
  gradient = "gradient",
}
