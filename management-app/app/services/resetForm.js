export const resetForm = () => {
  
  
  document.getElementById('namePro').value = '';
  document.getElementById('pricePro').value = '';
  document.getElementById('screenPro').value = '';
  document.getElementById('backCameraPro').value = '';
  document.getElementById('frontCameraPro').value = '';
  document.getElementById('imgPro').value = '';
  document.getElementById('descPro').value = '';
  document.getElementById('typePro').value = '';

  $('#myModal').modal('hide');
};
