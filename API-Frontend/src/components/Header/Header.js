import React, { useState } from 'react';
import style from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Notebook from '../Notebook/Notebook';

const Header = ({ fetchData, filterText, setFilterText }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastrarClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEnviarDados = async () => {

    const dados = {
      name: pessoa,
      age: idade,
      // telefone
    };
    console.log('Enviando dados para o backend:', dados);

    await axios.post('http://localhost:8080/contacts', dados)
      .then(async (res) => {
        const dadosTelefone = { 
          number: telefone,
          id_contact: res.data.ID,
        }
        await axios.post('http://localhost:8080/telephones', dadosTelefone)
          .then((res) => {
            fetchData()
          })
      })
      .catch(e => console.log(e));

    setPessoa('');
    setIdade('');
    setTelefone('');

    setModalOpen(false);
  };

  return (
    <>
      <div className={`${style.backgroundModal} ${modalOpen ? style.displayBlock : ''}`}>
        <div className={style.fields}>
          <span className={style.close} onClick={handleCloseModal}>&times;</span>
          <div className={style.fieldContents}>
            <label>Pessoa</label>
            <input type="text" value={pessoa} onChange={(e) => setPessoa(e.target.value)} />
          </div>
          <div className={style.fieldContents}>
            <label>Idade</label>
            <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} />
          </div>
          <div className={style.fieldContents}>
            <label>Telefone</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <button className={style.btnSubmit} onClick={handleEnviarDados}>Enviar</button>
        </div>
      </div>

      <div className={style.containerSchedule}>
        <h1 className={style.titleSchedule}>Agenda Telefônica</h1>
        <div className={style.btnSchedule}>
          <div>
            <input type="text" className={style.inputSearch} value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
            <button className={style.pesquisar}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
          <div>
            <button className={style.cadastrar} onClick={handleCadastrarClick}>Cadastrar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
