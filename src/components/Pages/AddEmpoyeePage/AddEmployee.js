import { useState } from "react";

const AddEmployee = ({onAdd}) => {

    const [text, setText] = useState('')
    const [designation, setDesignation] = useState('')
    const [gender, setGender] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text || !designation || !gender) {
            alert('Please enter all the fields');
            return;
        }

        onAdd({ text, designation, gender})

        setText('')
        setDesignation('')
        setGender('')

    }

    return(
        <form onSubmit={onSubmit}>
            <div className="row mt-5">
            <div className="col-lg-4 col-md-2" ></div>

            <div className="mx-auto col" style={{width: "70%"}}>
            <div className="mt-3">
                <label className="form-label">Employee Name:</label>
                <input type='text' className="form-control" value={text} onChange={(e) => setText(e.target.value)}></input>
            </div>
            <div className="mt-3">
                <label className="form-label">Designation:</label>
                <input type='text' className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)}></input>
            </div>
            <div className="mt-3">
                <label className="form-label">Gender:</label>
                
                
                <input type='text' className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}></input>
            </div>

            
            <input className="btn btn-primary mt-3" type='submit' value='Save Employee'></input>
            </div>
            <div className="col-lg-4 col-md-2"></div>
            </div>
        </form>
    )
}

export default AddEmployee;