import './CSS.css';
import { FiSearch } from 'react-icons/fi';


function Search(props) {

    const { valueSearch, setValueSearch } = props;

    function searchContact(e) {
        setValueSearch(e.target.value);
    }
    return (
        <div className="search-input">
            <input type="text" placeholder="search in contacts..." onChange={(e) => { searchContact(e) }} />
            <div className="search-icon">
                <FiSearch
                />
            </div>
        </div>
    )
}
export default Search;

