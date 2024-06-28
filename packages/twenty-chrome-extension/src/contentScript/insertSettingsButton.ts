import { isDefined } from '~/utils/isDefined';

const btn = document.getElementById('twenty-settings-btn');
if (!isDefined(btn)) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.src =
    'data:image/png;base64,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';
  img.height = 20;
  img.width = 20;
  img.alt = 'Funnelmink logo';

  // Write universal styles for the button
  const divStyles = {
    border: '1px solid black',
    borderRadius: '50%',
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
    height: '50px',
    width: '50px',
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: '9999999999999999999999999',
  };

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

  div.onclick = async () => {
    chrome.runtime.sendMessage({ action: 'openSidepanel' });
    chrome.storage.local.set({ navigateSidepanel: 'settings' });
  };

  div.appendChild(img);

  Object.assign(div.style, divStyles);

  document.body.appendChild(div);
}
