const heroicons = {
  toSvg: function () {
    if (typeof document === 'undefined') {
      throw new Error(
        '`heroicons.toSvg()` only works in a browser environment.'
      );
    }

    const elementsToReplace = document.querySelectorAll('[data-icon]');

    Array.from(elementsToReplace).forEach(async (element) => {
      const name = element.getAttribute('data-icon');
      const type = element.getAttribute('data-type');

      import(`./icons/${type}/${name}`).then((icon) => {
        const svg = new DOMParser().parseFromString(
          icon.default().trim(),
          'text/html'
        );
        const newChild = svg.body.querySelector('svg');
        element
          .getAttribute('class')
          .split(' ')
          .forEach((el) => {
            newChild.classList.add(el);
          });

        element.parentNode.replaceChild(newChild, element);
      });
    });
  },
};

export default heroicons;
