import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../Redux/actionCreators';
import Order from './Order/Order';
import Spinner from '../../Spinner/Spinner';
import { useEffect } from 'react';

const OrdersFC = (props) => {
  const { orders, orderLoading, orderError, token, userId } = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders(token, userId))
  }, [])

  let myorders = null;
  if (orderError) {
    myorders = <p
      style={{
        border: "1px solid gray",
        boxShadow: '1px 1px #888',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '10px'
      }}
    >Sorry failed to load order!</p>
  } else {
    if (orders.length) {
      myorders = orders.map(order =>
        <Order order={order} key={order.id} />
      )
    } else {
      myorders = <p
        style={{
          border: "1px solid gray",
          boxShadow: '1px 1px #888',
          borderRadius: '5px',
          padding: '20px',
          marginBottom: '10px'
        }}
      >you have no order!</p>
    }
  }
  return (
    <div>{orderLoading ? <Spinner /> : myorders}</div>
  )

} 

export default OrdersFC

// export default connect(mapStateToProps, mapDispatchToProps)(Orders)