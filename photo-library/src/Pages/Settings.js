import React, {useState} from 'react'
import ToggleSwitch from '../Components/ToggleSwitch'

function Settings() {
    const [value, setValue] = useState(false);
    return (
        <div>
            <h1>Settings Page</h1>
            <h2>Account Information</h2>
            <h2>Password</h2>
            <ToggleSwitch isOn={value} handleToggle={() => setValue(!value)} />
        </div>
    )
}

export default Settings
