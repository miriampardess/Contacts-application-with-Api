import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './Contacts';
import NewContact from './NewContact';

function Routing(props) {
    const { setContatsLength,addTo,randomImg, copyList, fillContactId, listLength,deleteContact, addToArray, contactsList} = props;

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/contacts/new" element={<NewContact setContatsLength={setContatsLength} randomImg={randomImg} addToArray={addToArray}/>} />
                    <Route path="/contacts/:id" element={<NewContact  setContatsLength={setContatsLength} randomImg={randomImg} listLength={listLength} copyList={copyList} fillContactId={fillContactId}/>} />
                    <Route path="*" element={<Contacts setContatsLength={setContatsLength} addTo={addTo} deleteContact={deleteContact} contactsList={contactsList} addToArray={addToArray} />} />

                </Routes>
            </Router>
        </div>
    )
}

export default Routing;