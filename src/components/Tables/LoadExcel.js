import React, { useState } from 'react'
import { uploadFile } from '../core/Services';

const LoadExcel = () => {

    const [file, setFile] = useState(null);
    const [errorFile, setErrorFile] = useState(null);
    const pathUpload = 'posdatedcheck/upload';

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorFile("");
        if (!file) {
            setErrorFile("No ha seleccionado un archivo");

        } else {
            
            let dataSend = {
                path: pathUpload,
                file: file,
                id: 1
            }

            try {
                let data = await uploadFile(dataSend);
                console.log("upload1", data);   
                setErrorFile(null);                  
                (data===200)?setErrorFile('Archivo guardado con éxito'):   (data.error) ? setErrorFile(data.error) : setErrorFile(null);
            } catch (error) {
                console.log("error", error)
            }
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h1>File Upload</h1>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
            {(errorFile) ? (errorFile === "fail to store excel data: org.hibernate.exception.ConstraintViolationException: could not execute statement") ? <label>No se pueden duplicar los registros</label> : <label>{errorFile}</label> : ''}
        </div>
    )
}

export default LoadExcel
