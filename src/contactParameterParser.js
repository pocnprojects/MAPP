
import React, {useEffect, useState} from 'react';
import {useParams, Navigate, useNavigate} from 'react-router-dom';

function tryParseJSONObject (jsonString){
    try {
        let o = JSON.parse(jsonString);
        if (o && typeof o === 'object') {
            return o;
        }
    }
    catch (e) { }

    return false;
};
const ContactParameterParser = () => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false)
    const {contactDetail} = useParams()
    const [contactDetailProp, setContactDetailProp] = useState({})
    let object = {}
    function putContactDetails(){
        object = JSON.parse(contactDetail)
        setContactDetailProp(tryParseJSONObject(contactDetail));
        if(typeof object ==='object'){
            console.log('reRendring')
            navigate('/', { state: object })
            object = null
        }
    }
    useEffect(() => {
        putContactDetails()
    }, [contactDetail])
    return (
      <div>
          {
              redirect ?
                  navigate('/', { state: object }) :
                  ''
          }
      </div>

)
}
export default ContactParameterParser;