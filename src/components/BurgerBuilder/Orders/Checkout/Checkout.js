import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../Spinner/Spinner'
import { resetIngredient } from '../../../../Redux/actionCreators'
import { useState } from 'react'

const CheckoutFC = (props) => {
  const [state, setState] = useState({
    delivaryAddress: '',
    phone: '',
    paymentType: 'Cash On Delivaray',
    isLoading: false,
    isModalOpen: false,
    Modalmsg: ''
  })

  const { ingredients, purchassble, totalPrice, userId, token } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setState({
      isLoading: true
    })
    // console.log(this.props); // console log
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      userId: userId,
      customer: state,
      orderTime: new Date()
    }
    // console.log(order);
    fetch('https://burger-builder-55d2b-default-rtdb.firebaseio.com/orders.json?auth=' + token, {
      method: 'POST',
      body: JSON.stringify(order)
    }).then(
      response => {
        if (response.status === 200) {
          setState({
            isLoading: false,
            isModalOpen: true,
            Modalmsg: 'Order place Successfully!'
          })
          dispatch(resetIngredient())
        } else {
          setState({
            isLoading: false,
            isModalOpen: true,
            Modalmsg: 'Something Went Wrong! place try again'
          })
        }
      }
    )
      .catch(
        () => setState({
          isLoading: false,
          isModalOpen: true,
          Modalmsg: 'Something Went Wrong! place try again'
        })
      )
  }

  const form = (<div>
    <h4 style={{
      border: "1px solid gray",
      boxShadow: '1px 1px #888',
      borderRadius: '5px',
      padding: '20px'
    }}
    >
      Payment: {totalPrice} BDT
    </h4>
    <form style={{
      border: "1px solid gray",
      boxShadow: '1px 1px #888',
      borderRadius: '5px',
      padding: '20px'
    }}>
      <input
        type="textarea"
        className='form-control'
        placeholder='your address'
        name='delivaryAddress'
        value={state.delivaryAddress}
        onChange={(e) => handleInputChange(e)}
      />
      <br />
      <input
        type="text"
        className='form-control'
        placeholder='your number'
        name='phone'
        value={state.phone}
        onChange={(e) => handleInputChange(e)}
      />
      <br />
      <select
        name='paymentType'
        value={state.paymentType}
        className='form-control'
        onChange={(e) => handleInputChange(e)}
      >
        <option value="Cash On Delivary">Cash On Delevary</option>
        <option value="bKas">bKash</option>
      </select>
      <br />
      <Button style={{ backgroundColor: "#d70f64" }}
        onClick={handleSubmit}
        disabled={!purchassble}
      >Place Order</Button>
      <Link to="/">
        <Button color='secondary'
          onClick={props.goBack} className="ml-3">Cancle</Button>
      </Link>
    </form>
  </div>)
  return (
    <div>
      {state.isLoading ? <Spinner /> : form}
      <Modal isOpen={state.isModalOpen} >
        <ModalBody>
          <p>{state.Modalmsg}</p>
        </ModalBody>
        <ModalFooter>
          <Link to="/">
            <Button color='primary'>Back to Home Page</Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  )

}
export default CheckoutFC