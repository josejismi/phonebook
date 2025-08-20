document.addEventListener('DOMContentLoaded', () => {

    // Pre-populated contacts
    let contacts = [
        { id: 1, firstName: 'Mike', lastName: 'Wheeler', phoneNumber: '123-456-7890', address: '2530 Piney Wood Lane' },
        { id: 2, firstName: 'Will', lastName: 'Byers', phoneNumber: '987-654-3210', address: '149 Coastline Road' },
        { id: 3, firstName: 'Maxine', lastName: 'Mayfield', phoneNumber: '555-123-4567', address: '5280 Moore Street' },
        { id: 4, firstName: 'Lucas', lastName: 'Sinclair', phoneNumber: '333-888-9999', address: '2550 Piney Wood Lane' },
        { id: 5, firstName: 'Dustin', lastName: 'Henderson', phoneNumber: '777-222-3333', address: '2886 Piney Wood Drive' },
        { id: 6, firstName: 'Steve', lastName: 'Harrington', phoneNumber: '111-999-0000', address: '8253 Carlton Road' },
        { id: 7, firstName: 'Jonathan', lastName: 'Byers', phoneNumber: '222-444-6666', address: '149 Coastline Road' },
        { id: 8, firstName: 'Jim', lastName: 'Hopper', phoneNumber: '888-777-5555', address: 'Sleepy Hollow Farm' },
        { id: 9, firstName: 'Millie', lastName: 'Bobby Brown', phoneNumber: '123-123-1234', address: 'Stone Mountain Park' },
        { id: 10, firstName: 'Jamie', lastName: 'Campbell Bower', phoneNumber: '444-555-7777', address: '906 E 2nd Ave' },
        { id: 11, firstName: 'Beth', lastName: 'March', phoneNumber: '666-111-2222', address: 'Concord, Massachusetts' },
        { id: 12, firstName: 'Josephine', lastName: 'March', phoneNumber: '999-333-4444', address: 'Concord, Massachusetts' }
    ];

    // DOM element selectors
    const contactListView = document.getElementById('contact-list-view');
    const contactFormView = document.getElementById('contact-form-view');
    const contactList = document.getElementById('contact-list');
    const fabButton = document.getElementById('add-contact-btn');
    const backButton = document.getElementById('back-btn');
    const contactForm = document.getElementById('contact-form');
    const formTitle = document.getElementById('form-title');
    const contactIdInput = document.getElementById('contact-id');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const phoneNumberInput = document.getElementById('phone-number');
    const addressInput = document.getElementById('address');
    const searchInput = document.getElementById('search-input');

    // Function to show a specific view and hide others
    const showView = (viewId) => {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    };

    // Helper function to get initials for the contact icon
    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Function to render the contacts list
    const renderContacts = (contactsToRender) => {
        contactList.innerHTML = ''; // Clear existing list

        // Sort contacts alphabetically by first name
        const sortedContacts = [...contactsToRender].sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        sortedContacts.forEach(contact => {
            const li = document.createElement('li');
            li.className = 'contact-item';
            li.innerHTML = `
                <div class="contact-icon">${getInitials(contact.firstName, contact.lastName)}</div>
                <div class="contact-info">
                    <div class="contact-name">${contact.firstName} ${contact.lastName}</div>
                    <div class="contact-phone">${contact.phoneNumber}</div>
                </div>
                <div class="contact-actions">
                    <button class="edit-btn" data-id="${contact.id}">✏️</button>
                    <button class="delete-btn" data-id="${contact.id}">🗑️</button>
                </div>
            `;
            contactList.appendChild(li);
        });
    };

    // Function to handle adding or editing a contact
    const handleSaveContact = (event) => {
        event.preventDefault();

        const contactId = contactIdInput.value;
        const contactData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            phoneNumber: phoneNumberInput.value,
            address: addressInput.value || '',
        };

        if (contactId) {
            // Edit existing contact
            const index = contacts.findIndex(c => c.id === parseInt(contactId));
            if (index !== -1) {
                contacts[index] = { ...contacts[index], ...contactData };
            }
        } else {
            // Add new contact
            const newId = Math.max(...contacts.map(c => c.id)) + 1;
            const newContact = { id: newId, ...contactData };
            contacts.push(newContact);
        }

        renderContacts(contacts);
        showView('contact-list-view');
    };

    // Function to handle editing a contact
    const handleEditContact = (contactId) => {
        const contact = contacts.find(c => c.id === parseInt(contactId));
        if (contact) {
            formTitle.textContent = 'Edit Contact';
            contactIdInput.value = contact.id;
            firstNameInput.value = contact.firstName;
            lastNameInput.value = contact.lastName;
            phoneNumberInput.value = contact.phoneNumber;
            addressInput.value = contact.address;
            showView('contact-form-view');
        }
    };

    // Function to handle deleting a contact
    const handleDeleteContact = (contactId) => {
        contacts = contacts.filter(c => c.id !== parseInt(contactId));
        renderContacts(contacts);
    };

    // Function to handle search
    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact =>
            contact.firstName.toLowerCase().includes(searchTerm) ||
            contact.lastName.toLowerCase().includes(searchTerm) ||
            contact.phoneNumber.includes(searchTerm)
        );
        renderContacts(filteredContacts);
    };

    // Event Listeners
    fabButton.addEventListener('click', () => {
        formTitle.textContent = 'Add Contact';
        contactIdInput.value = '';
        contactForm.reset();
        showView('contact-form-view');
    });

    backButton.addEventListener('click', () => {
        showView('contact-list-view');
    });

    contactForm.addEventListener('submit', handleSaveContact);

    searchInput.addEventListener('input', handleSearch);

    contactList.addEventListener('click', (event) => {
        const target = event.target;
        const contactId = target.dataset.id;
        if (contactId) {
            if (target.classList.contains('edit-btn')) {
                handleEditContact(contactId);
            } else if (target.classList.contains('delete-btn')) {
                if (confirm('Are you sure you want to delete this contact?')) {
                    handleDeleteContact(contactId);
                }
            }
        }
    });

    // Initial render
    renderContacts(contacts);
});