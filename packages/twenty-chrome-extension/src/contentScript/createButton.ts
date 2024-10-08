import { isDefined } from '~/utils/isDefined';
import { FUNNELMINK_CHROME_CONSTANTS } from '~/funnelmink/funnelmink-chrome-constants.ts';

interface CustomDiv extends HTMLDivElement {
  onClickHandler: (newHandler: () => void) => void;
}

export const createDefaultButton = (
  buttonId: string,
  buttonText = '',
): CustomDiv => {
  const btn = document.getElementById(buttonId) as CustomDiv;
  if (isDefined(btn)) return btn;
  const div = document.createElement('div') as CustomDiv;
  const img = document.createElement('img');
  const span = document.createElement('span');

  span.textContent = buttonText;
  img.src = FUNNELMINK_CHROME_CONSTANTS.logoBase64;
  img.height = 16;
  img.width = 16;
  img.alt = 'Twenty logo';

  // Write universal styles for the button
  const divStyles = {
    border: '1px solid black',
    borderRadius: '20px',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: '600',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    justifyContent: 'center',
    padding: '0 1rem',
    cursor: 'pointer',
    height: '32px',
    width: 'max-content',
  };

  Object.assign(div.style, divStyles);

  // Apply common styles to specifc states of a button.
  div.addEventListener('mouseenter', () => {
    const hoverStyles = {
      //eslint-disable-next-line @nx/workspace-no-hardcoded-colors
      backgroundColor: '#5e5e5e',
      //eslint-disable-next-line @nx/workspace-no-hardcoded-colors
      borderColor: '#5e5e5e',
    };
    Object.assign(div.style, hoverStyles);
  });

  div.addEventListener('mouseleave', () => {
    Object.assign(div.style, divStyles);
  });

  div.onClickHandler = (newHandler) => {
    div.onclick = async () => {
      const store = await chrome.storage.local.get();

      // If an api key is not set, the options page opens up to allow the user to configure an api key.
      if (!store.accessToken) {
        chrome.runtime.sendMessage({ action: 'openSidepanel' });
        return;
      }
      newHandler();
    };
  };

  div.id = buttonId;

  div.appendChild(img);
  div.appendChild(span);

  return div;
};
