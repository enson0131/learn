import { render as HeaderRender } from "./header";
import { render as ContentRender } from "./content";

const root = document.getElementById('root');

HeaderRender(root);
ContentRender(root);