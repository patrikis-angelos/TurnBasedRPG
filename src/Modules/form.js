const form = (() => {
  const createForm = () => {
    let body = document.querySelector('body');
    let form = document.createElement('form');
    form.id = 'form';
    form.classList.add('form');
    let input = document.createElement('input');
    input.id = 'name';
    input.type = 'text';
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('hidden');
    submit.onclick = (e) => {
      e.preventDefault();
      submitForm();
    };
    form.appendChild(submit);
    form.appendChild(input);
    body.appendChild(form);
  }

  const removeForm = () => {
    const form = document.querySelector('form');
    form.remove();
  }

  const submitForm = () => {

  }

  return {createForm, removeForm};
})();

export default form;