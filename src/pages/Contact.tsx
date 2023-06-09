import { useState } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  deleteCard,
  updateCard,
} from "../store/reducers/contactSlice";
import { v4 as uuidv4 } from "uuid";

const Contact: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contact.cards);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editContactId, setEditContactId] = useState<string | null>(null);

  const resetInput = () => {
    setFirstName("");
    setLastName("");
    setStatus("active");
    setIsModalOpen(false);
  };

  const handleAddContact = () => {
    if (editContactId) {
      // Update existing contact
      dispatch(
        updateCard({
          id: editContactId,
          firstName: firstName,
          lastName: lastName,
          status: status === "active",
        })
      );
      setEditContactId(null);
    } else {
      const newContact = {
        id: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        status: status === "active",
      };
      dispatch(addCard(newContact));
    }
    // setContacts([...contacts, newContact]);
    resetInput();
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteCard(id));
    resetInput();
  };

  const handleEditContact = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status ? "active" : "inactive");
      setEditContactId(id);
      setIsModalOpen(true);
    }
  };
  return (
    <div>
      {/* <button onClick={() => dispatch(addCard({ name: "Soumya" }))}>Add</button> */}
      {/* <button onClick={handleAddCard}>Add Card</button>

      {cards.map((card) => (
        <div key={card.id}>
          <p>Name: {card.name}</p>
          <button onClick={() => handleUpdateCard(card, "Jane Smith")}>
            Update Name
          </button>
          <button onClick={() => handleDeleteCard(card.id)}>Delete Card</button>
        </div>
      ))} */}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Contact List</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Contact
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-md p-4 max-w-sm">
              <h2 className="text-lg font-bold mb-4">
                {editContactId ? "Edit Contact" : "Add Contact"}
              </h2>

              <div className="mb-4">
                <label htmlFor="firstName" className="block font-bold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block font-bold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <span className="block font-bold mb-1">Status</span>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="status"
                    value="active"
                    checked={status === "active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    className="form-radio text-red-500"
                    name="status"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleAddContact}
                >
                  {editContactId ? "Update" : "Add"}
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="flex justify-between items-center py-2 border-b border-gray-300"
            >
              <div>
                <span className="font-bold mr-2">
                  {contact.firstName} {contact.lastName}
                </span>
                <span>{contact.status ? "Active" : "Inactive"}</span>
              </div>
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => handleEditContact(contact.id)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-gray-300 p-4 rounded-md flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-gray-600 mb-2">
                  {contact.status ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEditContact(contact.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {!contacts.length && "No records found"}
      </div>
    </div>
  );
};

export default Contact;
