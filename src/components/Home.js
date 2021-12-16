import './CSS.css';
import { useEffect, useState } from 'react';
import Routing from './Routing';
import axios from 'axios'

function Home(props) {

    useEffect(() => {
        getAllContactFromApi();
    }, [])

    //Random
    const [randomNumber, setRandomNumber] = useState();
    //Gender
    const [gender, setGender] = useState("");
    let [contatsLength, setContatsLength] = useState(3);

    //List of contacts
    const [contactsList, setContactsList] = useState([
    ]);
    //Get All Contact From Api
    function getAllContactFromApi() {
        axios.get('http://localhost:3000/api/getAllcontacts').then(res => {
            console.log(res.data);
            setContactsList(res.data)
        })
    }
    //Add a contact to the array
    function addToArray(newContacts) {
        var array = [...newContacts];
        setContactsList(array);
    }
    //Delete a contact
    function deleteContact(index) {
        let data = { index }
        axios.delete('http://localhost:3000/api/deleteContacts', { data }).then(res => {
            console.log(res.data);
            setContactsList(res.data)
            // deleteContact(res.data);
        })
    }
    // var array = [...contactsList]; // make a separate copy of the array 
    // array.splice(index, 1);       //Searching by unique ID
    // setContactsList(array);
    //Checking the length of the array
    function listLength() {
        return contactsList.length;
    }

    function fillContactId(newContact) {
        newContact.img(contactsList[newContact.id].img);
        newContact.name(contactsList[newContact.id].name);
        newContact.phone(contactsList[newContact.id].phone);
        if (contactsList[newContact.id].title)
            newContact.title(contactsList[newContact.id].title);
    }
    // copy of the List
    function copyList(array, id, newContact) {
        array = [...contactsList]; // make a separate copy of the List
        array[id] = newContact;
        setContactsList(array);
    }
    //Random function-Number and gender 
    function randomImg() {
        setRandomNumber(Math.floor((Math.random() * 100) + 1));
        if (Math.floor((Math.random() * 2) + 0) === 0)
            setGender("men");

        else
            setGender("women");

        let img = `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
        return img;
    }

    return (
        <div className="Home">
            <Routing contatsLength={contatsLength} setContatsLength={setContatsLength} randomImg={randomImg} copyList={copyList} fillContactId={fillContactId} listLength={listLength} addToArray={addToArray} deleteContact={deleteContact} contactsList={contactsList} setContactsList={setContactsList} />
        </div>
    )
}
export default Home;


















