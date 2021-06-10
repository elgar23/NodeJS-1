const fs = require('fs').promises
const path = require('path')

const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
  try {
    const contents = await fs.readFile(contactsPath, 'utf8');
    const contact = JSON.parse(contents)
  console.table(contact)
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
		try {
      const contents = await fs.readFile(contactsPath, 'utf8');
      const contact = JSON.parse(contents)
      contact.map((data) => {
    if (`${data.id}` === contactId) {
      console.log(data)
    }
  })
		} catch (error) {
			console.error(error);
		}
	
}

async function removeContact  (contactId)  {
  
  try {
    const contents = await fs.readFile(contactsPath, 'utf8');
  const contactsUpdated = JSON.parse(contents).filter(
    (elem) => elem.id !== parseInt(contactId)
  );
  
  await fs.writeFile(contactsPath, JSON.stringify(contactsUpdated), "utf8");
        
        console.log(`Contact with id:${contactId} was deleted`)
        
      }catch (error) {
  console.error(error);
}
}

async function addContact  (name, email, phone)  {
  try{
  const contents = await fs.readFile(contactsPath, 'utf8');
  const contact = JSON.parse(contents)
  const newContact = {
    id: JSON.parse(contents).length + 1,
    name: name,
    email: email,
    phone: phone,
  };
  const newList = [...contact, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newList), "utf8");
  console.log(`New contact ${name} ${email} ${phone} was added`);
} catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}