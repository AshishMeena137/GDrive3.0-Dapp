import { useEffect } from "react";
import "./Modal.css";

const Modal = ({setModalOpen,contract}) => {
    const sharing = async() => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
    };

    useEffect (() => {
        const accessList = async() => {
        const addressList = await contract.shareAccess();
        const select = document.querySelector("#selectNumber");
        const option = addressList;

        for(let i=0; i<option.length;i++){
            const opt = option[i];
            const el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
        }
        contract && accessList();
    },[]);
    return <>
      <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Share With</div>
            <div className="body">
                <input type="text" className="address" placeholder="Enter address" />
            </div>
            <form id="myForm">
                <select id="selectNumber">
                    <option className="address">People with access</option>
                </select>
            </form>
            <div className="footer">
            <button onClick={() => setModalOpen(false)} className="cancelBtn">Cancel</button>
            <button onClick={() => sharing()}>Share</button>
            </div>
        </div>
      </div>
    </>
};
export default Modal;