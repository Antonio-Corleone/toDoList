export default class Validation {
  checkEmpty (value, message) {
    if (value.trim() === '') {
      alert(message);
      return false;
    }
    return true;
  }
  checkFormat (value, message) {
    let pattern = /^[a-zA-Z0-9_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s].{2,10}$/
    if (!value.match(pattern)) {
      alert(message);
      return false;
    }
    return true;
  }
}