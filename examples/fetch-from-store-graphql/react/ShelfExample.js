import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Shelf from './components/Shelf'
import ErrorBoundary from './components/ErrorBoundary'
import Cart from './components/Cart'

class ShelfExample extends Component {

  constructor(props) {
    super(props)
    this.onSelectedSku = this.onSelectedSku.bind(this)
  }
  
  onSelectedSku(id) {
    console.log(this.props.data.orderForm.orderFormId)
    console.log(this.props.addItem)
    this.props.addItem({variables: {orderFormId: this.props.data.orderForm.orderFormId, items: [{id: id, quantity: 1, seller: 1}]}}).then((data) => {
      console.log("Adicionado ao carrinho", data);
    }, (data) => {
      console.log("Adicionado ao carrinho", data)
    })
    console.log("shelf example:", id)
  }

  render() {
    return (
      <ErrorBoundary>
        <h1>Shelf Example</h1>
        <Shelf
          from={0} to={5}
          query="test"
          salesChannel={1}
          orderBy="OrderByTopSaleDESC"
          onSelectedSku={this.onSelectedSku} />
        <Cart />
      </ErrorBoundary>
    )
  }

}

ShelfExample.propTypes = {

}

const mutation = gql`
mutation bla($orderFormId: String, $items: [OrderFormItemInput]){
  addItem(orderFormId: $orderFormId, items: $items){
    orderFormId
    items {
      name
    }
  }
}
`

const query = gql`
query Biro{
  orderForm{
       orderFormId
       value
       items {
         name
       }
       salesChannel
       loggedIn
       isCheckedIn
       storeId
       allowManualPrice
       canEditData
       userProfileId
       userType
       ignoreProfileData
       totalizers {
         id
         name
         value
       }
  } 
 }
`

const options = {
  options: ({ orderFormId = '', value = '', items = {}}) => ({
    variables: {
      value,
      items,
      orderFormId
    },
  }),
}

export default compose(
  graphql(query, options),
  graphql(mutation, {name: 'addItem'})
)(ShelfExample)

// export default ShelfExample
