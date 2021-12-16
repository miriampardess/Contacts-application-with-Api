import { useEffect, useRef, useState } from 'react';
import './CSS.css';
import { FiRefreshCw } from 'react-icons/fi'
import { useLocation, Link, useHref } from 'react-router-dom';
import axios from 'axios'
function NewContact(props) {

    //Variable from parent
    const { copyList, randomImg, addToArray, listLength, fillContactId } = props;
    //New contact
    const [newContact, setNewContact] = useState({ name: "", phone: "", title: "", img: "" })
    //Contats Length
    let [contatsLength, setContatsLength] = useState(3);

    //Whether to allow saving - required fields
    const [validName, setValidName] = useState("");
    const [validPhone, setValidPhone] = useState();

    const [id, setId] = useState();
    const [state, setState] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [title, setTitle] = useState();
    const [contactIdValid, setContactIdValid] = useState(true);
    // Is there a cell name
    const [flagValidName, setflagValidName] = useState(false);
    // Is there a cell phone
    const [flagValidPhone, setflagValidPhone] = useState(false);
    const [img, setImg] = useState();
    //Know whether to update or create a new one
    const [updateOrNew, setUpdateOrNew] = useState("");
    //To url
    const location = useLocation();
    //Img
    const imgRef = useRef();


    useEffect(() => {
        //Is the new contact or an update
        let url = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        if (url !== "new") {
            setflagValidPhone(false)
            setflagValidName(false)
            setUpdateOrNew("id");
            setflagValidPhone(true)
            setflagValidName(true)
            //function-Contact update 
            updateContact();
        } else {
            setUpdateOrNew("new");
            //Image raffle when the component rises
            RandomNumGander();
        }
    }, [])

    //Random Img: Num & Gander
    function RandomNumGander() {
        setImg(randomImg());
    }

    function updateContact() {
        //Retrieving the Id from the url
        setId(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
        //Local variable solve the problem of React until the end of the variable function is not updated
        let id2 = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        let idNum = Number(id2)//conversion
        //Is the id invalid
        if (isNaN(+idNum) || idNum >= listLength() || idNum < listLength() - listLength()) {
            alert(" The selected contact does not exist");
            //Allow editing of the contact
            setContactIdValid(false);
        }
        else {
            let newContact = { "id": id2, "img": setImg, "name": setName, "phone": setPhone, "title": setTitle }
            fillContactId(newContact);
        }
    }

    function addnewContactToApi(newContact) {
        axios.post('http://localhost:3000/api/addContact', newContact).then(res => {
            console.log(res.data);
            addToArray(res.data);

        })
    }

    //Save Contact
    const saveContact = () => {
        if (updateOrNew == "new") {
            if (name !== "" && phone >= 0 && title != "") {
                setContatsLength++
                let newContact = { "id": setContatsLength, "img": imgRef.current.src, "name": name, "phone": phone, "title": title }
                addnewContactToApi(newContact)
            }
        }
        else {
            if (contactIdValid && name !== "" && phone !== "" && title !== "") {
                let newContact = { "img": imgRef.current.src, "name": name, "phone": phone, "title": title }
                var array;
                copyList(array, id, newContact);

            }
        }

    }
    //Validation on the Name
    function ValidationName(e) {

        setflagValidName(false)
        if (e.length > 0) {
            setflagValidName(true)
        }
        if (e.length > 30) {
            setValidName("Invalid value should be less than 30");
            setflagValidName(false)
        }
        else {
            if (updateOrNew == "new") {
                setNewContact({ ...newContact, name: e })
            }
            setValidName("")
            setName(e);
        }
    }
    //Validation on the Phone
    function ValidationPhone(e) {
        setflagValidPhone(false)
        if (e.length > 0) setflagValidPhone(true)
        let phoneno = /^(?=.*[0-9])[- +()0-9]+$/
        let phoneNumber = e.slice(e.lastIndexOf(' ') + 1);

        if (!phoneno.test(phoneNumber)) {
            setValidPhone("The number is invalid")
            setPhone();
            setflagValidPhone(false)
        }
        else {
            if (updateOrNew == "new") {
                setNewContact({ ...newContact, phone: e })
            }
            setValidPhone("")
            setPhone(e);
        }

    }
    //Validation on the Title
    function ValidationTitle(e) {
        if (updateOrNew == "new") {
            setNewContact({ ...newContact, title: e })
        }
        setTitle(e);
    }
    return (
        <div className="contact-container">
            <div className="new-contact-container">
                {/*Image */}
                <div className="new-contact-avatar">
                    <img ref={imgRef} src={`${img}`} />
                    <button onClick={RandomNumGander}><FiRefreshCw /></button>
                </div>
                <div className="new-contact-inputs">
                    {/* Name */}
                    <div className="new-contact-input">
                        <div>
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => ValidationName(e.target.value)} />
                        </div>

                        <div className="labelName">{validName}</div>
                    </div>
                    {/* Phone */}
                    <div className="new-contact-input">
                        <div>
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e) => ValidationPhone(e.target.value)} />
                        </div>

                        <div className="labelPhone">{validPhone}</div>
                    </div>
                    {/* Title */}
                    <div className="new-contact-input">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => ValidationTitle(e.target.value)} />
                    </div>
                </div>
                {/* Save & Cancel */}
                <div className="new-contact-buttons">
                    <Link className={flagValidPhone && flagValidName ? "" : "disable"} to="/">
                        <button className="button-ok" onClick={() => { saveContact() }}>Save</button>
                    </Link>
                    <Link to="/"><button className="button-cancel" >Cancel</button></Link>

                </div>
            </div>
        </div>
    )
}

export default NewContact;

