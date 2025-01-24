
import ReactDOM from 'react-dom/client';

import "~/assets/tailwind.css";

import { Question } from './Question';


export default defineContentScript({
    matches: ['*://*/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        const ui = await createShadowRootUi(ctx, {
            name: 'content-script',
            position: 'inline',
            onMount: (container) => {
              // Don't mount react app directly on <body>
              const wrapper = document.createElement("div");
              wrapper.id = "app-wrapper";
              container.append(wrapper);
      
              const root = ReactDOM.createRoot(wrapper);
              root.render(<Question />);
              return { root, wrapper };
            },
            onRemove: (elements) => {
              elements?.root.unmount();
              elements?.wrapper.remove();            },
        });

        ui.mount();
    },
});