import React from 'react'

const LogErrorTable = ({data}) => {
    return (
        
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Banco</th>
                        <th>Cliente</th>
                        <th>Compania</th>
                        <th>Credito</th>
                        <th>Moneda</th>
                        <th>Cuenta</th>
                        <th>Nº cheque</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ? 
                        (
                            data.map((item) => (
                                <tr key={item.id.toString()}>
                                    <td>{(!item.bank)?'': item.bank.name}</td>
                                    <td>{(!item.client)?'':item.client.name}</td>
                                    <td>{(!item.company)?'':item.company.name}</td>
                                    <td>{(!item.credit)?'':item.credit.code}</td>
                                    <td>{(!item.currency)?'':item.currency.code}</td>
                                    <td>{(!item.account)?'':item.account}</td>
                                    <td>{(!item.checkNumber)?'':item.checkNumber}</td>
                                    <td>{(!item.information)?'':item.information}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={8}>Sin datos</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default LogErrorTable

