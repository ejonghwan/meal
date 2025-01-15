import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};



export interface Todo {
  id: string;
  title: string;
  is_done: boolean;
  created_at: {
    seconds: string;
  };
}