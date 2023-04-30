import React, { useEffect, useState, useRef } from "react";
import { ImageBoxClose, ImageInput, ImageSubmit, ImageViewer, UploadBox } from "../Style";
import { ref, uploadBytes } from "firebase/storage";
import { Utility } from "../../Utility";
import { auth, db, storage } from "../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDocs, or, query, updateDoc, where } from "firebase/firestore";
import { useSelector } from "react-redux";


function UploadAvatar({ display, toggleWindow, toggleAvatarSettings }) {
    const [user] = useAuthState(auth)
  const [imageUpload, setImageUpload] = useState(null);
  const [tempImage,setTempImage] = useState(null)
  const { username } = useSelector((state)=>state.user)
  const imageInput = useRef()
  const utility = Utility();

  const uploadImage = (e) => {

    if (imageUpload == null){
        utility.notify('Select a .jpg image first')
    }else{
        e.target.disabled = true;
        const imgName = `images/${user.uid}`;
        const ImageRef = ref(storage, imgName);
        uploadBytes(ImageRef, imageUpload)
          .then(async () => {
            e.target.disabled = false;
            // Upload data
            const queryRef = query(collection(db, "users"), where("uid","==",user.uid))
            
            const imgRef = await getDocs(queryRef)
            const docRef = doc(db, "users",imgRef.docs[0].id)
            updateDoc(docRef, {
                imgpath: imgName
            }).then(async (res) =>{
                toggleWindow()
                URL.revokeObjectURL(tempImage)
                setImageUpload(null)
                setTempImage(null)
                imageInput.current.value = null
            })
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const previewImage = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setTempImage(url)
    setImageUpload(e.target.files[0])
    imageInput.current.value = null
    toggleAvatarSettings()
  }

  const closeAvatarUpload = (e) => {
    toggleWindow()
    setTempImage(null)
    imageInput.current.value = null
  }

  return (
    <>
      <UploadBox visible={display}>
        <>
            <ImageViewer image={tempImage}></ImageViewer>
            {/* <ImageName></ImageName> */}
          <ImageInput
            type="file"
            onChange={previewImage}
            placeholder="text"
            ref={imageInput}
          />
          <ImageSubmit type="submit" onClick={uploadImage} />
        <ImageBoxClose onClick={closeAvatarUpload}>Close</ImageBoxClose>
        </>
      </UploadBox>
    </>
  );
}

export default UploadAvatar;
