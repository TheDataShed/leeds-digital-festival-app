import { css } from 'lit-element/lit-element';

/* shared styles for all views */
export const sharedStyles = css`
      html,
      :host>* {
        --yellow-color: #FFCD38;
        --black-color: #393A34;
        --white-color: #fff;
        --error-color: red;
      }

      a {
        text-decoration: none;
        color: var(--black-color);
      }

      /**
      * Add the correct display in IE 10-.
      */

      [hidden] {
        display: none;
      }`;
