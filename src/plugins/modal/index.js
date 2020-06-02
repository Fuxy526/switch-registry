import Modal from './Modal.vue';

export default {
  install(Vue) {
    const property = '$modal';
    const instance = new Vue(Modal);
    document.body.appendChild(instance.$mount().$el);

    const show = (options) => {
      const {
        title = '',
        content = '',
        description = '',
        cancelButtonText = 'Cancel',
        cancelButtonCallback = () => {},
        confirmButtonText = 'OK',
        confirmButtonCallback = () => {},
      } = options;
      instance.title = title;
      instance.content = content;
      instance.description = description;
      instance.cancelButtonText = cancelButtonText;
      instance.cancelButtonCallback = cancelButtonCallback;
      instance.confirmButtonText = confirmButtonText;
      instance.confirmButtonCallback = confirmButtonCallback;
      instance.show = true;
    };

    const prompt = (options) => {
      instance.prompt = true;
      instance.placeholder = options.placeholder || '';
      show(options);
    };

    const hide = () => {
      instance.show = false;
    };

    const modal = {
      show,
      prompt,
      hide,
    };

    Vue.prototype[property] = modal;
  },
};
