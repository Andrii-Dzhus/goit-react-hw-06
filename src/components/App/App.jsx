import { useSelector, useDispatch } from "react-redux";
import {
  selectContacts,
  addContact,
  deleteContact,
} from "../../redux/contactsSlice";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const addNewContact = newContact => {
    dispatch(addContact(newContact));
  };

  const deleteContactById = contactId => {
    dispatch(deleteContact(contactId));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addNewContact} />
      <SearchBox
        value={filter}
        onFilter={filter => dispatch(changeFilter(filter))}
      />
      <ContactList contacts={visibleContacts} onDelete={deleteContactById} />
    </div>
  );
}
