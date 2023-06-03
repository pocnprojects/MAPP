export function addressToString(addressObject) {
  try {
    let str = [];
    addressObject.addressLine.forEach((e) => {
      str.push(e.toString() + " ");
    });
    if (!!addressObject.dependentLocality)
      str.push(addressObject.dependentLocality);
    if (!!addressObject.sortingCode) str.push(addressObject.sortingCode);
    if (!!addressObject.postalCode) str.push(addressObject.postalCode);
    if (!!addressObject.region) str.push(addressObject.region);
    if (!!addressObject.city) str.push(addressObject.city);
    if (!!addressObject.organization) str.push(addressObject.organization);
    if (!!addressObject.recipient) str.push(addressObject.recipient);
    if (!!addressObject.phone) str.push(addressObject.phone);
    if (!!addressObject.country) str.push(addressObject.country);
    return str.join(", ");
  } catch (error) {
    console.log(error);
  }
}

export function contactDisplayStringHelper(contact,dataArray,dataDetail) {
    try {
        Object.keys(contact).forEach((element,index) => {
            if (Array.isArray(contact[element]) && contact[element].length === 0) {
                delete contact[element];
            }
            else if(element == 'address'){
                contact[element].forEach(ele=>{
                    console.log('Hello',ele,element)
                    dataArray.push(ele)
                    dataDetail.push(element)
                })
            }else {
                contact[element].forEach(ele=>{
                    dataArray.push(ele) 
                    dataDetail.push(element)
                    console.log(element);
                })
            }
        })

    } catch (error) {
      console.log(error);
    }
  }
  export function contactDuplicateRemover(contact) {
    try {
        Object.keys(contact).forEach((element,index) => {
          contact[element] = [...(new Set(contact[element]))]
        })
        console.log('contactDuplicateRemover',contact)

    } catch (error) {
      console.log(error);
    }
  }
  