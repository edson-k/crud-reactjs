export default function ValidationFrom(state) {
    let errors = {};

    if (!state.productCode) {
      errors["code"] = "*Please enter product code.";
    }

    if (!state.productDescription) {
      errors["description"] = "*Please enter product description.";
    }

    if (!state.produtctShortDescription) {
      errors["shortDescription"] = "*Please enter product short description.";
    }

    if (!state.productStatus) {
      errors["status"] = "*Please enter product status.";
    }

    if (!state.productValue) {
      errors["value"] = "*Please enter product value.";
    }

    if (typeof state.productValue !== "undefined") {
      if (!state.productValue.match(/^[0-9]+\.?[0-9]*$/)) {
        errors["value"] = "*Please enter valid value no.";
      }
    }

    if (!state.productQty) {
      errors["qty"] = "*Please enter product qty.";
    }

    if (typeof state.productQty !== "undefined") {
      if (!state.productQty.match(/^[0-9]*$/)) {
        errors["qty"] = "*Please enter valid qty no.";
      }
    }

    return errors;
};