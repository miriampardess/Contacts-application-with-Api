import { Link } from "react-router-dom";
import { FaPhone, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function OneContact(props) {

    //Variable from parent
    const { findKey, c, deleteContact } = props;
    const [idKey, setIdKey] = useState();

    useEffect(() => {
        setIdKey(findKey(c));
    }, [c])

    return (
        <div className="contact">
            <div className="contact-avatar">
                <img src={c.img} />
            </div>
            <div className="contact-details" >
                {/* Contact ID */}
                <Link to={`/contacts/${idKey}`}>
                    <div className="contact-name" >{c.name}</div>
                </Link>
                {/*Phone */}
                <div className="contact-phone">{c.phone}</div>
            </div>
            <div className="contact-buttons">
                {/* FaPhone icon */}
                <button><FaPhone size={15} title="Phone" /></button>
            </div>
            <div className="contact-button-close">
                {/* FaTimes Delete */}
                <FaTimes onClick={() => deleteContact(idKey)} />
            </div>
        </div>
    )
}
export default OneContact;