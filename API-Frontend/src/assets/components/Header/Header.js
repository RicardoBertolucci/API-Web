import React from 'react';
import style from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  return (
    <div className={style.containerSchedule}>
      <h1 className={style.titleSchedule}>Agenda Telefônica</h1>
      <div className={style.btnSchedule}>
        <div>
          <input type="text"  className={style.inputSearch}/>
          <button className={style.pesquisar}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        <div>
          <button className={style.cadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  )
}

export default Header