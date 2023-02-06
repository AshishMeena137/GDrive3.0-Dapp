import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({account,provider,contract}) => {
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("No image is selected");
    const handleSubmit = async(e) => {
       e.preventDefault();
       if(file){
         try{
            const formData = new FormData();
            formData.append("file",file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                  pinata_api_key: `e490e5c71bb94faab26d`,
                  pinata_secret_api_key: `4679fee4c181e4567b24197c76e311c83d2cddf1daf0d7b01637f8d173dfe584`,
                  "Content-Type": "multipart/form-data",
                },
              });
              const ImagHash = `ipfs://${resFile.data.ipfsHash}`;
              contract.add(account,ImagHash);
              alert("successfully upload");
              setFile(null);
              setFileName("No image is selected");
         }catch(e){
            alert("unable to upload image to pinata");
         }
       }
    }
    const retrieveFile = (e) => {
      const data = e.target.files[0]; //files array of files object
      // console.log(data);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };
      setFileName(e.target.files[0].name);
      e.preventDefault();
    };

    return <>
      <div className="top">
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="file-upload" className="choose">Choose image</label>
            <input disable = {!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload</button>
        </form>
      </div>
    </>
};
export default FileUpload;