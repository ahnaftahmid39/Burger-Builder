import React, { Component, useEffect, useState } from 'react'
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import {
    Modal,
    Button,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    addIngredient,
    removeIngredient,
    updatePurchassble
} from '../../Redux/actionCreators';

// const mapStateToProps = state => {
//     return {
//         ingredients: state.ingredients,
//         purchassble: state.purchassble,
//         totalPrice: state.totalPrice
//     }
// }

// const mapDispatchToPosps = dispatch => {
//     return {
//         addIngredient: (igType) => dispatch(addIngredient(igType)),
//         removeIngredient: (igType) => dispatch(removeIngredient(igType)),
//         updatePurchassble: () => dispatch(updatePurchassble())
//     }
// }

// export class BurgerBuilder extends Component {
//     state = {
//         modalOpen: false
//     }

//     addIngredientHandle = type => {
//         this.props.addIngredient(type)
//         this.props.updatePurchassble()
//     }

//     removeIngredientHandle = type => {
//         this.props.removeIngredient(type)
//         this.props.updatePurchassble()
//     }

//     toggleModal = () => {
//         this.setState({
//             modalOpen: !this.state.modalOpen
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <div className='d-flex flex-column flex-md-row'>
//                     <Burger ingredients={this.props.ingredients} />
//                     <Controls
//                         ingredientAdded={this.addIngredientHandle}
//                         ingredientRemoved={this.removeIngredientHandle}
//                         price={this.props.totalPrice}
//                         toggleModal={this.toggleModal}
//                         purchassble={this.props.purchassble}
//                     />
//                 </div>
//                 <Modal isOpen={this.state.modalOpen}>
//                     <ModalHeader>Your order summary</ModalHeader>
//                     <ModalBody>
//                         <Summary ingredients={this.props.ingredients} />
//                         <h5>Total Price: {this.props.totalPrice} BDT</h5>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Link to="/checkout" >
//                             <Button style={{ backgroundColor: '#d70f64' }}>
//                                 Continue to checkout
//                             </Button>
//                         </Link>
//                         <Button color='secondary' onClick={this.toggleModal} >
//                             Cancle
//                         </Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }
// }


const BurgerBuilderFC = () => {
    const { ingredients, purchassble, totalPrice } = useSelector(state => state)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        modalOpen: false
    })

    const addIngredientHandle = type => {
        dispatch(addIngredient(type))
        dispatch(updatePurchassble())
    }

    const removeIngredientHandle = type => {
        dispatch(removeIngredient(type))
        dispatch(updatePurchassble())
    }

    const toggleModal = () => {
        setState({
            modalOpen: !state.modalOpen
        })
    }

    return (
        <div>
            <div className='d-flex flex-column flex-md-row'>
                <Burger ingredients={ingredients} />
                <Controls
                    ingredientAdded={addIngredientHandle}
                    ingredientRemoved={removeIngredientHandle}
                    price={totalPrice}
                    toggleModal={toggleModal}
                    purchassble={purchassble}
                />
            </div>
            <Modal isOpen={state.modalOpen}>
                <ModalHeader>Your order summary</ModalHeader>
                <ModalBody>
                    <Summary ingredients={ingredients} />
                    <h5>Total Price: {totalPrice} BDT</h5>
                </ModalBody>
                <ModalFooter>
                    <Link to="/checkout" >
                        <Button style={{ backgroundColor: '#d70f64' }}>
                            Continue to checkout
                        </Button>
                    </Link>
                    <Button color='secondary' onClick={toggleModal} >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default BurgerBuilderFC
// export default connect(mapStateToProps, mapDispatchToPosps)(BurgerBuilder)