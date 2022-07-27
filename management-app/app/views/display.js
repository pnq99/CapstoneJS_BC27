import { myModal } from '../services/elements.js';
import { resetForm } from '../services/resetForm.js';

// import span
const formGroups = Array.from(myModal.querySelectorAll('.form-group'));

formGroups.forEach((formGroup) => {
  const notificationSpan = document.createElement('span');
  notificationSpan.className = 'notificationSpan';
  return formGroup.insertAdjacentElement('beforeend', notificationSpan);
});
