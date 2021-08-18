import React, { useState,useRef } from 'react';

const url = "https://boardroomonebackend.herokuapp.com/profiles";


const FormComponent = () => {
    const fileRef = useRef();
    const [confirmed, setConfirmed] = useState(false);
    const [image, setImage] = useState(null);
    const [displayImage, setdisplayImage] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const confirm = () => {
        setConfirmed(true);
    }
    const onFileUpload = (event) => {
        setImage(event.target.files[0])
    }
    const hideImage = () => {
        setdisplayImage(false);
    }
    const upload = async () => {
        let formData = new FormData();
        console.log(image);
        formData.append("file", image)
        console.log(formData);
       let response = await fetch(url, {
            method: 'POST',
            body: formData
       })
        if (!response.ok) {
            setHasError(true);
        } else {
        await response.json()
                .then(res =>
                setImageUrl(res.profileImageUrl)
                ).then(()=> setdisplayImage(true)) 
        }
    }

    if (confirmed) {
        return (
            <>
                <div>
                    <h1>Image confirmed thank you </h1>
                </div>
            </>
        )
    }
    
    return (
        <>
            <div>
                <input
                    ref={fileRef}
                    type='file'
                    title=""
                    onChange={onFileUpload}
                />
                <button onClick={upload}>
                    upload
                </button>
            </div>
            { displayImage && <div>
                <img src={imageUrl} alt='' />
                <div>
                    <button onClick={confirm}>Confirm</button>
                    <button onClick={hideImage}>Reject</button>
                </div>
            </div>}
        </>
        
    )

}

export default FormComponent;