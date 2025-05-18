function SelectField({ data, attrs, value, handleSelect, disabledTitle = null}) {
    if ( typeof data !== 'object' || ! Object.keys(data).length ) {
        return null;
    }

    return <select { ...attrs } value={value} onChange={handleSelect}>
        {
            disabledTitle && <option value="" disabled={true}>{disabledTitle}</option>
        }
        {
            Object.keys(data).map( code => (
                <option key={code} value={code}>{data[code]?.name}</option>
            ) )
        }
    </select>
}

export default SelectField;