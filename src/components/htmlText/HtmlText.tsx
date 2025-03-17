import { forwardRef } from "react";

import s from './htmlText.module.scss';

export interface htmlTextProps {
  html: string;
  id: string;
  className: string;
}

export const HtmlText = forwardRef<HTMLDivElement, htmlTextProps>(({ html, id, className }, ref) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      className={`${s.htmlText} ${className}`}
      ref={ref}
    >
    </div>
  );
});