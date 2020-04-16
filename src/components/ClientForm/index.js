import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Mutation } from 'react-apollo'

const ClientForm = props => {
  // recives a mutatation and depending on the screen that calls this component we migth recive a client info to edit
  let { client, propMutation, session } = props;

  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [company, setCompany] = useState('');
  const [emails, setEmails] = useState([{ email: '' }]);
  const [clientId, setClienId] = useState('');
  useEffect(() => {
    // if we are editing the component gets a client and fills the state with its information
    if (client) {
      setType(client.type)
      setCompany(client.company)
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setAge(client.age)
      setEmails(client.emails)
      setClienId(client.clientId)
    }
    return () => {
      client = {}
    }
  }, [client])

  // EMAILS
  // add new input fields for the emails
  const newInputField = () => {
    setEmails([...emails, { email: "" }]);
  }
  // removes input fields for the emails
  const removeInputField = fieldIndex => () => {
    setEmails(emails.filter((email, index) => fieldIndex !== index));
  }
  // modifies each email field
  const handleInputChange = (e, index) => {
    emails[index].email = e.target.value;
  }

  // FORM & MUTATION
  const sendFrom = (e, mutation) => {
    e.preventDefault();
    const input = {
      clientId,
      firstName,
      lastName,
      company,
      type,
      emails,
      age: Number(age),
      userId: session._id,
    }
    mutation({ variables: { input } });
  }
  // AFTER MUTATION ENDS
  const saveAndExit = () => {
    if (client) {
      const { refetch } = props;
      refetch()//.then(() => history.push('/'));
    } else {
      // history.push('/');
    }
    history.push('/clients');
  }

  return (
    <>
      <Mutation
        mutation={propMutation}
        onCompleted={saveAndExit}
      >
        {runMutation => (
          <form
            className="col-md-8 m-3"
            onSubmit={e => sendFrom(e, runMutation)}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Fist Name</label>
                <input defaultValue={firstName} type="text" className="form-control" placeholder="Fist Name" onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input defaultValue={lastName} type="text" className="form-control" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Company</label>
                <input defaultValue={company} type="text" className="form-control" placeholder="Company" onChange={e => setCompany(e.target.value)} />
              </div>
              {emails.map((obj, index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Email: {index + 1}</label>
                  <div className="input-group">
                    <input
                      defaultValue={obj.email}
                      type='email'
                      placeholder='Email'
                      className='form-control'
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    <div className="input-group-append">
                      <button
                        type='button'
                        className="btn btn-danger"
                        onClick={removeInputField(index)}
                      > &times; Delete </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button
                  onClick={newInputField}
                  type="button"
                  className="btn btn-warning"
                >
                  Agregar Email
                    </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Age</label>
                <input defaultValue={age} type="text" className="form-control" placeholder="Age" onChange={e => setAge(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Client Type</label>
                <select value={type} className="form-control" onChange={e => setType(e.target.value)} >
                  <option value="">Chose...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASIC">BASIC</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">Save Client</button>
          </form>
        )}
      </Mutation>
    </>
  )
}

export default ClientForm;