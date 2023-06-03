
const reStructureEmailAndPhoneNumbers = (data, string) => {
  var testingCondition = string == 'phoneNumbers' ? 1 : 0
  var RawList = testingCondition ? data.phoneNumbers : data.emailAddresses
  var WithLabel = {}
  var WithId = {}
  var WithLabelAndId = {}
  var emailNumberKey = testingCondition ? 'number' : 'email'
  RawList.map((d) => {
    var no = d[emailNumberKey].replace(/\s/g, '')
    var label = WithLabel[d.label]
    var id = d.id
    WithId[no] = id
    if (label == undefined) {
      label = new Set()
      label.add(no)
    }
    else {
      label.add(no)
    }
    WithLabel[d.label] = label
  })
  var WithLabelKeys = Object.keys(WithLabel)
  WithLabelKeys.map((d) => {
    WithLabel[d] = [...WithLabel[d]]
  })

  Object.entries(WithLabel).forEach(([key, value]) => {
    var label = WithLabel[key]
    var cond = WithLabelAndId[key]
    var keyName = testingCondition ? 'number' : 'email'
    label.map((d) => {
      var tempObj = {}
      if (cond == undefined) {
        cond = []
        tempObj[keyName] = d
        tempObj['id'] = WithId[d]
        cond.push(tempObj)
      }
      else {
        tempObj[keyName] = d
        tempObj['id'] = WithId[d]
        cond.push(tempObj)
      }
      WithLabelAndId[key] = cond
    })
  })

  return WithLabelAndId
}

// const getSelectedPhoneEmailList=(dataList,selectedData)=>{
//   var res=[]

// }

const selectedContactStructure = (data, selectedData) => {
  if (data == null && selectedData == null)
    return
  //console.log(data,selectedData)
  var resultObj = {}
  var emailList = []
  var phoneNumberList = []
  var cnd = selectedData['displayName'] ? 1 : 0
  if (cnd)
    resultObj['displayName'] = data.displayName

  Object.entries(selectedData).forEach(([Key, Value]) => {
    var list = Key.split(' ')
    if (list[1] == 'email')
      emailList.push({
        "label": list[3],
        "email": list[2]
      })

    else if (list[1] == 'number')
      phoneNumberList.push({
        "label": list[3],
        "number": list[2]
      })
  })
  if (emailList != -[])
    resultObj['emailAddresses'] = emailList
  if (phoneNumberList != [])
    resultObj['phoneNumbers'] = phoneNumberList
  return resultObj
}

const deleteRecordIds = (contactObject) => {
  const globalRegex = new RegExp('^((id)|(rawContactid)|(recordid)|(recordID))$', 'gim');
  Object.keys(contactObject).forEach(element => {
    let testResult = globalRegex.test(element.toString())
    globalRegex.test(element.toString());
    if (testResult) {
      delete contactObject[element];
    } else if (Array.isArray(contactObject[element])) {
      contactObject[element].forEach(ele => {
        deleteRecordIds(ele);
      })

    }
  })
  return contactObject;
}
const contactFlatning = (contactObject) => {
  Object.keys(contactObject).forEach(element => {
    if (Array.isArray(contactObject[element])) {

    }
  })

  return contactObject;
}

const stripingEmptyFieldsFromRecord = (contactObject) => {
  Object.keys(contactObject).forEach(element => {
    if (!!!contactObject[element]) {
      delete contactObject[element]
    }
    if (Array.isArray(contactObject[element]) && contactObject[element].length == 0) {
      delete contactObject[element];
    }
  })
  return contactObject
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const recordSegregator = (contactObject) =>{
  let returnObj = {
    "work":new Set(),
    "mobile" : new Set(),
    "others" :new Set(),
    "workEmail":new Set(),
    "homeEmail" : new Set(),
    "othersEmail" :new Set()
  }
  let regularExpression = /[^0-9]/g
  let hasValueSet = new Set();
    
      if(!!contactObject.phoneNumbers && contactObject.phoneNumbers.length>0){

        contactObject.phoneNumbers.forEach(ele=>{
          if(!!ele.label && ele.label.toString().toLowerCase() != 'work' && ele.label.toString().toLowerCase() != 'mobile'){
            if(!hasValueSet.has(ele.number.replace(regularExpression, ''))){
              returnObj.others.add(ele);
            }
            hasValueSet.add(ele.number.replace(regularExpression, ''));

          }else if (!!ele.label){
            if(!hasValueSet.has(ele.number.replace(regularExpression, ''))){
              returnObj[ele.label.toString().toLowerCase()].add(ele);
            }
            hasValueSet.add(ele.number.replace(regularExpression, ''));

          }
        })

      if(!!contactObject.emailAddresses && contactObject.emailAddresses.length>0){
        contactObject.emailAddresses.forEach(ele=>{
          if(!!ele.label && ele.label.toString().toLowerCase() != 'work' && ele.label.toString().toLowerCase() != 'home'){
            if(!hasValueSet.has(ele.email.replace(regularExpression, ''))){
              returnObj['others' + 'Email'].add(ele);
            }
            hasValueSet.add(ele.email.replace(regularExpression, ''));


          }else if (!!ele.label){
            if(!hasValueSet.has(ele.email.replace(regularExpression, ''))){
              returnObj[ele.label.toString().toLowerCase() + 'Email'].add(ele);
            }
            hasValueSet.add(ele.email.replace(regularExpression, ''));

          }
        })
      }
    }
  Object.keys(returnObj).forEach(element=>{
    returnObj[element]  = [...returnObj[element]];
  })
    // console.log('returnObj from record segreagtor',returnObj)
  return returnObj
}

/*
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
*/

const addNameProperties = (result) => {
  var displayName = result.displayName.split(' ')
  //console.log('yellow', displayName)
  result['givenName'] = displayName[0]
  if (displayName.length > 3) {
    result['middleName'] = displayName[1]
    for (var i = 2; i < displayName.length; i++)
      result['familyName'] += displayName[i] + ' '
  }
  else if(displayName.length==2){
    result['familyName'] = displayName[1]
  }
  //console.log('kkkk', result)
  return result
}
module.exports = {
  reStructureEmailAndPhoneNumbers,
  selectedContactStructure,
  deleteRecordIds,
  recordSegregator,
  capitalizeFirstLetter,
  stripingEmptyFieldsFromRecord,
  addNameProperties
}