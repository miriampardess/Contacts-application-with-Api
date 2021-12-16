import './CSS.css';
import Search from './Search';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaRandom, FaUserPlus } from 'react-icons/fa';
import OneContact from './OneContact';
import axios from 'axios'
function Contacts(props) {

    //Variable from parent
    const { deleteContact, addToArray, contactsList } = props;//, contactsList, setContactsList 
    //Search
    const [valueSearch, setValueSearch] = useState();
    const [searchStringNumber, setSearchStringNumber] = useState();

    //Add a random contact-refresh button
    function randomContact() {
        debugger
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                let newContact = {
                    "img": data.results[0].picture.large,
                    "name": data.results[0].name.first + " " + data.results[0].name.last,
                    "phone": data.results[0].cell,
                    "title": data.results[0].name.title,
                }
                // Push the contact into the array  
                addNewContactToApi(newContact);
            });
    }
    //Add New Contact ToApi
    function addNewContactToApi(newContact) {
        axios.post('http://localhost:3000/api/addContact', newContact).then(res => {
            console.log(res.data);
            addToArray(res.data);
        })
    }
    function moveToNewContact() {
        // props.history.push('/contacts/new');
        //Routing to add a new contact
    }

    useEffect(() => {
        //Value Search
        if (valueSearch) {
            //Is it a number
            if (!isNaN(valueSearch)) {
                setSearchStringNumber("phone");
            }
            // Is it characters
            else {
                setSearchStringNumber("name");
            }
        }
        else
            setSearchStringNumber("");

    }, [valueSearch])

    function findKey(c) {

        let id = contactsList.findIndex(contact => contact === c);
        return id;
    }
    return (
        <div className="contact-container">
            {/* //Assuming a component of search */}
            <Search setValueSearch={setValueSearch} />

            <div className="contacts-container">
                {/*Search, pass the list  */}
                {contactsList.slice(1).map((c, key) =>

                    searchStringNumber ?
                        // Phone
                        searchStringNumber === "phone" ?
                            //Comparing the number
                            c.phone.replaceAll(" ", "").includes(valueSearch.replaceAll(" ", ""))

                                ?
                                <OneContact c={c} deleteContact={deleteContact} findKey={findKey} />
                                : ""
                            :
                            // Name
                            //Comparing the string(name)
                            c.name.replaceAll(" ", "").toLowerCase().includes(valueSearch.replaceAll(" ", "").toLowerCase())
                                ?
                                <OneContact c={c} deleteContact={deleteContact} findKey={findKey} />
                                // idKey={idKey} setIdKey={setIdKey}
                                : ""
                        : <OneContact c={c} deleteContact={deleteContact} findKey={findKey} />
                )}

            </div>
            {/*Add a contact - regular & random*/}
            <div className="contact-new">
                <button onClick={moveToNewContact}>
                    <Link to="/contacts/new"><FaUserPlus size={20} style={{ color: "black" }} /></Link>
                </button>
                <button onClick={randomContact}>
                    <FaRandom size={20} style={{ marginLeft: "15px" }} />
                </button>
            </div>

        </div>
    )
}
export default (Contacts);

