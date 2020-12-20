import React,{ useState} from 'react'

const Dropdown = ({data}) => {
    const [selectedOption, setSelectedOption] = useState(data[0].id);
    return (
        <div>
            <select
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}>
                    <option key={'0'} value={0}>{'Seleccione'}</option>
                {data.map(o => (
                    <option key={o.id.toString()} value={o.id}>{o.yearFiscal}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
