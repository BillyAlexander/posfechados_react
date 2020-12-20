import React, { useState, useEffect } from 'react'
import LogErrorTable from './components/Tables/LogErrorTable';
import LoadExcel from './components/Tables/LoadExcel';
//import Dropdown from './components/Tables/Dropdown';
import { findData, baseUr } from './components/core/Services';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';


const App = () => {
  registerLocale('es', es);

  const pathLogs = 'logerrorexcel/list';
  const pathFiscalYear = 'fiscalyear/list';
  const pathPDF = 'logerrorexcel/reportPdf';
  const [listLogs, setListLogs] = useState([]);
  const [listFiscal, setListFiscal] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const pathReal = (fiscal,start, end,pathOld) => {
    let url = "";
    if (fiscal === 0) {
      url = pathOld;
    } else {
      url = pathOld + '?ejercicioId=' + fiscal + '&startDate=' + start + '&endDate=' + end;
    }
    return url;
  }
  
  const handleListlogs = async (fiscal, start, end) => {
    let url = pathReal(fiscal,start, end,pathLogs);
    
    try {
      let data = await findData(url);
      setListLogs(data);
    } catch (error) {
      setListLogs([]);
    }
  };
  const handleListFiscal = async () => {
    try {
      let data = await findData(pathFiscalYear);
      setListFiscal(data);
    } catch (error) {
      setListFiscal([]);
    }
  }
  useEffect(() => {
    handleListFiscal();
  }, []);
  useEffect(() => {
    handleListlogs();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === 0)
      alert('Seleccione un Ejercicio fiscal');
    else
      handleListlogs(selectedOption, startDate, endDate);

  }

  const handlePdf = (e) => {
    //e.preventDefault();
    //console.log(listLogs.length);
    if (selectedOption === 0)
      alert('Seleccione un Ejercicio Fiscal');
    else{
      let url = pathReal(selectedOption,startDate, endDate,pathPDF);
      window.open(baseUr.domain + url, '_blank');
    }
     
  }


  //console.log(listFiscal);

  return (
    <div className="container">
      <h1 className="text-center">Información Posfechados</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Cargar Excel</h2>
          <LoadExcel />
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Log de Errores de Información en Archivos Excel</h2>
          <form onSubmit={handleSubmit} >
            <table>
              <tbody>
                <tr>
                  <td><div><label>Ejercicio:</label><div>
                    <select
                      value={selectedOption}
                      onChange={e => { setSelectedOption(e.target.value); }}>
                      <option key={0} value={0}>{'Seleccione'}</option>
                      {listFiscal.map(o => (
                        <option key={o.id.toString()} value={o.id}>{o.yearFiscal}</option>
                      ))}
                    </select>
                  </div></div></td>
                  <td><div><label>Inicio:</label><DatePicker dateFormat="yyyy-MM-dd" locale="es" selected={startDate} onChange={date => setStartDate(date)} /></div></td>
                  <td><div><label>Fin:</label><DatePicker dateFormat="yyyy-MM-dd" locale="es" selected={endDate} onChange={date => setEndDate(date)} /></div></td>
                  <td><div><button type="submit">Buscar</button></div></td>
                </tr>
              </tbody>
            </table>
          </form >
          <button onClick={handlePdf} type="button">PDF</button>
          <LogErrorTable data={listLogs} />
        </div>
      </div>
    </div>
  )
}

export default App
