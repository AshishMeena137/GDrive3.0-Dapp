import "./Modal.css";
const Disallow = ({contract,setRemove}) => {

    const disallow = async() => {
        const address = document.querySelector(".address").value;
        await contract.disallow(address);
    }
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Remove permission</div>
            <div className="body">
                <input type="text" className="address" placeholder="Enter address" />
            </div>
            <div className="footer">
            <button onClick={() => setRemove(false)} className="cancelBtn">Cancel</button>
            <button onClick={() => disallow()}>Disallow</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Disallow
