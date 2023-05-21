import { render as HeaderRender } from "./header";
import { render as FooterRender } from "./footer";

const root = document.getElementById('root');

import('app01/Content').then(({ render: ContentRender }) => {
    HeaderRender(root);
    ContentRender(root);
    FooterRender(root);
});