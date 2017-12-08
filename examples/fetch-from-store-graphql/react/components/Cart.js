import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import ProductImage from './ProductImage'

class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render() {
    const { data } = this.state
    console.log(data);
    return (
      <div>
        {data.orderForm.items.length > 0
            ? (
              <ul class="list pl0 ml0 center mw5 ba b--light-silver br3">
                {data.orderForm.items.map(product => (
                  <li class="ph3 pv2 bb b--light-silver" key={product.productId} className="fl w-80 pa2 ba b--black-30">
                    <div className="db link tc fl w-20">
                      <ProductImage
                        width={50} height={50}
                        url={product.imageUrl}
                        alt={product.name}
                        className="w-100 db outline black-10 grow"/>
                    </div>
                    <dl className="fl mt2 f6 lh-copy w-80">
                      <dt className="clip">Product Name</dt>
                      <div className="db link dim tc">
                        <dd className="ml0 blue truncate w-100">{product.name}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            )
            : <div>Cart Empty</div>
        }
      </div>
    )
  }
}

Cart.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
query Biro{
 orderForm{
      orderFormId
      value
      items {
        id
        productId
        imageUrl
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

export default graphql(query, options)(Cart)
