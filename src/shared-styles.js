import { css } from 'lit-element/lit-element';

/* shared styles for all views */
export const sharedStyles = css`
      html,
      :host>* {
        --pink-color: #E200B2;
        --blue-color: #1B1464;
        --black-color: #1D1D1B;
        --grey-color: #F5F5F5;
        --white-color: #FFFFFF;
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
