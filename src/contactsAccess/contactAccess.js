import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import QrCodeGenerator from '../qrcodeGenerator/qrCodeGenerator';
import globalStyle from '../style';
//import '../App.css';
import QrScanner from '../qrReader/qrReader';
import VCard from 'vcard-creator';
import { addressToString, contactDisplayStringHelper, contactDuplicateRemover} from '../helpers/contactAcess.helper';


// console.log(process.argv)

function downloadToFile(content, filename, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

function stripObject(obj) {
  Object.keys(obj).forEach((ele) => {
    if (Array.isArray(obj[ele]) && obj[ele].length === 0) {
      delete obj[ele];
    } 
    // else {
    //     obj[ele] = [...(new Set(obj[ele]))]
    // }
  });
}

const ContactAccess = (props) => {
  let propsArray = [];
  const opts = { multiple: false };
  const [showQRCode, setShowQRCode] = useState(false);
  const [contactDetails, setContactDetails] = useState("");
  const [scanQR, setScanQR] = useState(false);
  //   const [scannedData, setScannedData] = useState(null);
  let { state } = useLocation();
  const [contactFormGroup, setContactFormGroup] = useState([]);
  const [toggle, setToggle] = useState([]);
  const [contactExpanded, setContactExpanded] = useState([]);
  const [isGenerateQR, setIsGenerateQr] = useState(false);
  const [qrCodeData, setQRCodeData] = useState("");
  const [qrDetail, setQrDetails] = useState([]);
  const [isToggleTrue, setIsToggleTrue] = useState(false);
  const [contactArray, setContactArray] = useState([]);
  const [contact, setContact] = useState('')
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [customShareShow, setCustomShareShow] = useState(false)
  //
  useEffect(()=>{
    console.log('Executing UseEffect OutSide',toggle,contact)
    if(toggle.length == 0 && !!contact)
    {
      console.log('Executing UseEffect')
      handleResults(JSON.parse(contact));
    }
  },[contact,toggle])

  useEffect(() => {
    if (!!state && typeof state === "object") {
      console.info("state");
      scannedDataDisplay(JSON.stringify(state));
      window.history.replaceState({}, document.title);
      state = null;
    }
  }, [state]);
  function generateQR() {
    try {
      setCustomShareShow(false)
      // setQRCodeData
      // setIsToggleTrue(false);
      let obj = {
        name: [],
        email: [],
        tel: [],
        address: [],
        icon: [],
      };
      let arr = toggle;
      console.log("arr", arr, qrDetail);
      arr.forEach((element, index) => {
        console.log(element, index);
        if (element) {
          console.log("contactExpanded", contactExpanded[index], qrDetail);
          obj[qrDetail[index]].push(contactExpanded[index]);
        }
      });
      console.log(obj);
      stripObject(obj);
      if (!obj.tel && !obj.email) {
        alert("Kindly choose a Contact Number or MailID to proceed ahead");
        clearQR();
        return;
      } else {
        console.log(JSON.stringify(obj));
        setQRCodeData(JSON.stringify(obj));
        setIsGenerateQr(true);
      }
      // setToggle([])
      // setIsToggleTrue(false);
    } catch (error) {
      console.log("Error in generateQR", error);
    }
  }
  async function checkProperties() {
    try {
      const supported = "contacts" in navigator && "ContactsManager" in window;
      if (!supported) {
        alert("Please access the webPage using HTTPS and on chrome version > 80");
        return;
      }
      const supportedProperties = await navigator.contacts.getProperties();
      if (supportedProperties.includes("name")) {
        propsArray.push("name");
      }
      if (supportedProperties.includes("email")) {
        propsArray.push("email");
      }
      if (supportedProperties.includes("tel")) {
        propsArray.push("tel");
      }
     
      /**
       * 
        if (supportedProperties.includes("address")) {
          propsArray.push("address");
        }
      if (supportedProperties.includes("icon")) {
          propsArray.push('icon')
      }
       */
    } catch (error) {
      console.log(error);
    }
  }
    function handleCheckBoxChange(e, boolean = null) {
    try {
      console.log("handle checkbox change");
      let temp = toggle;
      console.log('toggle',toggle)
      temp[e] = boolean !== null ? boolean : !temp[e];
      //   setToggle((toggle) => {
      //     console.log(temp);
      //     return temp;
      //   });
      setToggle(temp);
      console.log("OnChnage Called", e, toggle);
    } catch (e) {
      console.log(e);
    }
  }
  function handleResults(contacts) {
    try {
      let formGroup = [];
      let dataArray = [];
      let dataDetail = [];
      if (Array.isArray(contacts) && contacts.length > 0) {
        contacts = contacts[0];
        contactDuplicateRemover(contacts);
        console.log("ContactDetails : ", contacts);
        setShowQRCode(true);
        contactDisplayStringHelper(contacts, dataArray, dataDetail);
        console.log("dataArray and data Detail", dataArray, dataDetail);
        let newTogArray = [];
        let ContactExpandedArray = [];
        dataArray.forEach((element) => {
          newTogArray.push(false);
        });
        console.log(newTogArray)
        setToggle(newTogArray);
        dataArray.forEach((element, index) => {
          console.log("BYE", dataDetail);
          ContactExpandedArray.push(element);
          setContactArray(contactExpanded);
          console.log("contactExpanded", contactExpanded);
          console.log("contactArray", contactArray);

          /**
           * (index > 0 &&
              dataDetail[index - 1] === "name" &&
              dataDetail[index] != "address")
           */
          if (dataDetail[index] === "name") {
            formGroup.push(<FormControlLabel control={<Checkbox defaultChecked disabled onChange={() => handleCheckBoxChange(index)} />} label={element} key={index} />);
            handleCheckBoxChange(index, true);
          } else if (dataDetail[index] === "address") {
            console.log("inside FromGroup attachment", element);
            let str = addressToString(element);
            formGroup.push(<FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(index)} />} label={str} key={index} />);
          } else formGroup.push(<FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(index)} />} label={element} key={index} />);
        });
        setContactExpanded(ContactExpandedArray);
        setQrDetails(dataDetail);
        setContactFormGroup(
          <FormGroup id="FormGroup" style={globalStyle.checkBoxHeight}>
            {formGroup}
          </FormGroup>
        );
        setIsToggleTrue(true);
        setContactDetails(JSON.stringify(contacts));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function getContacts() {
    try {
      clearQR();
      
      checkProperties().then(async (res) => {
        const contacts = await navigator.contacts.select(propsArray, opts);
        setScanQR(false);
        console.log(contacts)
        let arr =[]
        setToggle(arr)
        setContact(JSON.stringify(contacts))
        setCustomShareShow(true)
        // handleResults(contacts);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  function clearQR(size = 0) {
    try {
      setCustomShareShow(false);
      setShowQRCode(false);
      setContactDetails("");
      // setIsToggleTrue(false)
    //   let arr = []
    //   setToggle(arr);
      setIsGenerateQr(false);
      setIsToggleTrue(false)
      // setContactExpanded([]);
      // setScanQR(false);
      // setScannedData(null);
      // setContactFormGroup([]);
      // setToggle([]);
      // setQRCodeData('')
      // setQrDetails([])
      // setIsToggleTrue(false)
      // setContactArray([])
    } catch (e) {
      console.log(e);
    }
  }

  function resetPage() {
    try {
      setShowQRCode(false);
      setContactDetails("");
      setToggle([]);
      setIsGenerateQr(false);
      setContactExpanded([]);
      setScanQR(false);
      setContactFormGroup([]);
      setToggle([]);
      setQRCodeData('')
      setQrDetails([])
      setIsToggleTrue(false)
      setContactArray([])
    } catch (e) {
      console.log(e);
    }
  }

  // function isToggleTrue(){
  //     if(!Array.isArray(toggle))
  //     return false
  //     console.log('isToggleTrue',toggle)
  //     let arr = toggle;
  //     // let res = arr.some(element === true)
  //     return arr.some((element => element === true));
  // }
  function displayContactDetail() {
    try {
      let contactJson = JSON.parse(qrCodeData);
      console.log("Contact JSON", contactJson);
      let renderAray = [];
      // renderAray.push(<p>Share</p>)
      Object.keys(contactJson).forEach((element) => {
        if (element === "address") {
          renderAray.push(
            <p>
               {addressToString(contactJson[element][0])}
            </p>
          );
        } else {
          contactJson[element].forEach(telAndEmail=>{
            renderAray.push(
                <p>
                   {telAndEmail.toString()}
                </p>
              );
          })
        }
      });
      return renderAray;
    } catch (e) {
      console.log(e);
    }
  }
  function scanQRCode() {
    try {
      setScanQR(true);
      clearQR();
    } catch (e) {
      console.log(e);
    }
  }

  function scannedDataDisplay(data) {
    try {
      console.log("got Data", data);
      //   setScannedData(data);
      data = JSON.parse(data);
      let myVCard = new VCard();
      if (Array.isArray(data.name) && data.name.length) {
        let name = data.name[0];
        let prefix = "";
        // const regex = /^(mrs|mr|ms|jr|sr|md|p(\.)?h(\.)?d|miss|dr)(\.)?/gim;
        // prefix = !!name.match(regex) ? name.match(regex) : "";
        // name = name.replace(regex, "").trim();
        name = name.split(" ")
        // console.log(name, name[name.length -1]);
        let firstName = ''
        let lastName = ''
        if(name.length > 1){
            lastName = name[name.length-1]
            name.pop()
        }
        firstName = name.join(' ');
        // lastName = name.replace(firstName, "").trim();
        console.log("lastName:", lastName.trim(), "firstName : ", firstName.trim(), "prefix :", prefix);
        myVCard.addName(lastName.trim(), firstName.trim(), "", prefix, "");
      }
      if (Array.isArray(data.tel) && data.tel.length) {
        data.tel.forEach((element, index) => {
          let desc = "WORK";
          if (index === 0) {
            desc = "PREF;" + desc;
          }
          myVCard.addPhoneNumber(element.toString(), desc);
        });
      }
      if (Array.isArray(data.address) && data.address.length) {
        data.address.forEach((element) => {
          console.log("Scanning address", !!element.addressLine && !!element.addressLine.length, !!element.city, !!element.postalCode, !!element.country);
          myVCard.addAddress(
            " ",
            " ",
            !!element.addressLine && !!element.addressLine.length ? element.addressLine.join(", ") : " ",
            !!element.city ? element.city : " ",
            " ",
            !!element.postalCode ? element.postalCode : " ",
            !!element.country ? element.country : " "
          );
        });
      }
      if (Array.isArray(data.email) && data.email.length) {
        data.email.forEach((element, index) => {
          let desc = "WORK";
          if (index === 0) {
            desc = "PREF;" + desc;
          }
          myVCard.addEmail(element.toString(), desc);
        });
      }
      let now = new Date();
      let fileName = "vcard_" + now.toDateString() + " " + now.toLocaleTimeString() + ".vcf";
      console.log(myVCard.toString());
      downloadToFile(myVCard.toString(), fileName, "text/vcard");
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={globalStyle.mainBoxStyle}>
      {!scanQR && !isToggleTrue ? <Button variant="contained" id="button" onClick={getContacts} style={globalStyle.marginBox}>
        {" "}
        Select & Share{" "}
      </Button> : ''}
      {(!!isGenerateQR || (isToggleTrue && customShareShow)) || !!scanQR ? <p className="c9">{!!scanQR ? 'Scan In' : 'Share QR'}</p> : ""}
      {showQRCode && !!contactDetails ? (
        <div >
          {!!isGenerateQR ? <QrCodeGenerator contactDetails={qrCodeData} /> : ""}
          {!!isGenerateQR ? <ul style={globalStyle.contactListStyle}>{displayContactDetail()}</ul> : ""}
          {!isGenerateQR ? contactFormGroup : ""}
          {isToggleTrue && customShareShow ? (
            <div style={globalStyle.buttonBox}>
             
              {/* <Button  variant="contained"  onClick={generateQR} style={{...globalStyle.marginBox, ...globalStyle.marginBox}} className="twentyPercent" startIcon={close}> */}
              <IconButton  onClick={clearQR} style={globalStyle.marginBox} className="twentyPercent">
                <CloseIcon/>
              </IconButton>

            {/* </Button> */}
            <Button variant="contained" id="button" onClick={generateQR} style={globalStyle.marginBox} className="eightyPercent">
              {" "}
              Continue{" "}
            </Button>
              </div>
          ) : (
            ""
          )}
          {!!isGenerateQR ? (
            <Button variant="contained" id="clearQR" onClick={clearQR} style={globalStyle.marginBox}>
              {" "}
              Home{" "}
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {!scanQR && !isToggleTrue ? <Button variant="contained" id="button" onClick={scanQRCode} style={globalStyle.marginBox}>
        {" "}
        Scan-In{" "}
      </Button> : ''}
      {!!scanQR ? <QrScanner closeQR={setScanQR} scannedData={scannedDataDisplay} parentScanningState={scanQR} /> : ""}
    </div>
  );
};
export default ContactAccess;
