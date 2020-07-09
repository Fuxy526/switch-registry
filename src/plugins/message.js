const install = function (Vue) {
  const messageEl = document.createElement('div');
  messageEl.className = 'switch-registry-message';
  messageEl.style = 'position: fixed; z-index: 99; top: 50%; left: 50%;display: inline-block; font-size: 12px; background-color: rgba(0, 0, 0, .6); color: #fff; height: 32px; line-height: 32px; text-align: center; border-radius: 2px; font-weight: bold; box-shadow: 0 4px 12px rgba(0, 0, 0, .15); transition: .1s all ease-in-out; opacity: 0; padding: 0 20px; transform: translate(-50%, -50%) scale(0);';
  let to;

  const clear = () => {
    if (to) {
      clearTimeout(to);
    }
    if (messageEl.parentNode) {
      messageEl.style.opacity = '0';
      messageEl.style.transform = 'translate(-50%, -50%) scale(0)';
      messageEl.parentNode.removeChild(messageEl);
    }
  };

  const message = msg => {
    clear();
    messageEl.innerText = msg;
    document.body.appendChild(messageEl);
    setTimeout(() => {
      messageEl.style.opacity = '1';
      messageEl.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 0);
    to = setTimeout(() => {
      clear();
    }, 3000);
  };

  Vue.prototype.$message = message;
};

export default install;
