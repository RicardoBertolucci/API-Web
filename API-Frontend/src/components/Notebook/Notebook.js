import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import style from './Notebook.module.css';

const Notebook = () => {
  const [arrayContacts, setArrayContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [telephone, setTelephone] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/telephones/contacts');
      setArrayContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMouseEnter = (index) => {
    const updatedArrayContacts = [...arrayContacts];
    updatedArrayContacts[index].showButtons = true;
    setArrayContacts(updatedArrayContacts);
  }

  const handleMouseLeave = (index) => {
    const updatedArrayContacts = [...arrayContacts];
    updatedArrayContacts[index].showButtons = false;
    setArrayContacts(updatedArrayContacts);
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    const contact = arrayContacts[index];
    setName(contact.Contact?.NOME);
    setAge(contact.Contact?.IDADE);
    setTelephone(contact.NUMBER);
  }
  
  const handleCancelEdit = () => {
    setName('');
    setAge('');
    setTelephone('');
    setEditIndex(null);
  }

  const handleSave = async (telephoneId) => {
    const body = {
      name,
      age,
      number: telephone
    }
    await axios.put(`http://localhost:8080/telephones/${telephoneId}/contacts`, body)
      .then((res) => {
        console.log(res.data);
        handleCancelEdit()
        fetchData()
      })
      .catch((e) => console.error(e));

  }

  const handleDelete = async (contactId) => {
    await axios.delete(`http://localhost:8080/telephones/${contactId}/contacts`)
      .then((res) => fetchData())
      .catch((e) => console.error(e));
    
  }

  return (
    <>
      <Header 
        fetchData={fetchData}
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <div className={style.containerSchedule}>
        <div className={style.backgroundSchedule}>
          <div className={style.tableSchedule}>
            <div className={style.columnData}>
              <span>Nome</span>
            </div>
            <div className={style.columnData}>
              <span>Idade</span>
            </div>
            <div className={style.columnData}>
              <span>Telefone</span>
            </div>
          </div>
          {arrayContacts
            .filter((contact, index) => 
              contact.Contact.NOME.toLowerCase().includes(filterText.toLowerCase()) ||
              contact.NUMBER.toString().includes(filterText)
            )
            .map((contact, index) => (
            <div
              key={index}
              className={style.tableSchedule}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {editIndex === index ? (
                <>
                  <div className={style.columnData}>
                    <input type="text" className={style.content} value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className={style.columnData}>
                    <input type="text" className={style.content} value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>
                  <div className={style.columnData}>
                    <input type="text" className={style.content} value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </div>
                  <div className={style.buttonContainer}>
                    <button onClick={() => {
                      handleSave(contact.ID)
                    }}>Salvar</button>
                    <button onClick={() => handleCancelEdit()}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <div className={style.columnData}>
                    <div className={style.content}>{contact.Contact?.NOME}</div>
                  </div>
                  <div className={style.columnData}>
                    <div className={style.content}>{contact.Contact?.IDADE}</div>
                  </div>
                  <div className={style.columnData}>
                    <div className={style.content}>{contact.NUMBER}</div>
                  </div>
                  {contact.showButtons && (
                    <div className={style.buttonContainer}>
                      <button onClick={() => handleEdit(index)}>Editar</button>
                      <button onClick={() => handleDelete(contact.ID)}>Apagar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notebook;
