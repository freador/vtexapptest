import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import ProductImage from './ProductImage'

class SkuComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect() {
    const id = this.props.data.itemId
    this.props.onSelect(id)
  }

  render() {
    const { data } = this.props
    return (
      <div className="pointer" onClick={this.handleSelect}>
          {data.name}
      </div>
    )
  }
}

class SkuContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSku: null
    }
    this.onSelectSku = this.onSelectSku.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  onSelectSku(itemId) {
    console.log(itemId)
    this.setState({
      selectedSku: itemId
    })
  }

  addToCart() {
    console.log("add to cart")
    this.props.onSelectedSku(this.state.selectedSku)
  }

  componentDidMount() {
    const $this = this
  }

  render() {
    const { items } = this.props
    let buyButton = null
    if (this.state.selectedSku !== null) {
      buyButton = <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" onClick={this.addToCart}>Comprar</button>
    }
    return (
      <div>
        <ul className="flex list ma0 pa0 mt2 mb2">
          {items.map(item => (
            <li className="outline w-25 pa3 ma2" key={item.itemId}>
              <SkuComponent data={item} onSelect={this.onSelectSku} />
            </li>
          ))}
        </ul>
        {buyButton}
      </div>
    )
  }
}

class Shelf extends Component {

  constructor(props) {
    super(props)
    this.onSelectedSku = this.onSelectedSku.bind(this)
  }
  
  onSelectedSku(id) {
    this.props.onSelectedSku(id)
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <div>{JSON.stringify(data.variables, null, 2)}</div>
        {data.loading
          ? <FormattedMessage id="store-graphql.loading" />
          : data.products
            ? (
              <div className="cf pa2">
                {data.products.map(product => (
                  <div key={product.productId} className="fl w-50 w-25-m w-20-l pa2">
                    <a href={product.link} className="db link dim tc">
                      <ProductImage
                        width={250} height={250}
                        url={product.items[0].images[0].imageUrl}
                        alt={product.productName}
                        className="w-100 db outline black-10"/>
                    </a>
                    <div>
                      <SkuContainer onSelectedSku={this.onSelectedSku} items={product.items} />
                    </div>
                    <a href={product.link} className="db link dim tc">
                      <dl className="mt2 f6 lh-copy">
                        <dt className="clip">Product Name</dt>
                        <dd className="ml0 blue truncate w-100">{product.productName}</dd>
                        <dt className="clip">Price</dt>
                        <dd className="ml0 gray truncate w-100">
                          {product.items[0].sellers[0].commertialOffer.Price}
                        </dd>
                      </dl>
                    </a>
                  </div>
                ))}
              </div>
            )
            : <div>Empty</div>
        }
      </div>
    )
  }
}

Shelf.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = gql`
  query Products(
    $query: String
    $category: String
    $specificationFilters: [String]
    $priceRange: String
    $collection: String
    $orderBy: String
    $from: Int
    $to: Int
    $salesChannel: String
  ) {
    products(
      query: $query
      category: $category
      specificationFilters: $specificationFilters
      priceRange: $priceRange
      collection: $collection
      orderBy: $orderBy
      from: $from
      to: $to
      salesChannel: $salesChannel
    ) {
      productId
      productName
      brand
      linkText
      productReference
      categoryId
      categories
      categoriesIds
      clusterHighlights {
        id
        name
      }
      link
      description
      items {
        itemId
        name
        nameComplete
        complementName
        ean
        referenceId {
          Key
          Value
        }
        measurementUnit
        unitMultiplier
        images {
          imageId
          imageLabel
          imageTag
          imageUrl
          imageText
        }
        sellers {
          sellerId
          sellerName
          addToCartLink
          sellerDefault
          commertialOffer {
            Installments {
              Value
              InterestRate
              TotalValuePlusInterestRate
              NumberOfInstallments
              PaymentSystemName
              PaymentSystemGroupName
              Name
            }
            Price
            ListPrice
            PriceWithoutDiscount
            RewardValue
            PriceValidUntil
            AvailableQuantity
            Tax
            CacheVersionUsedToCallCheckout
            DeliverySlaSamples {
              DeliverySlaPerTypes {
                TypeName
                Price
                EstimatedTimeSpanToDelivery
              }
              Region {
                IsPersisted
                IsRemoved
                Id
                Name
                CountryCode
                ZipCode
                CultureInfoName
              }
            }
          }
        }
        variations {
          name
          values
        }
        attachments {
          id
          name
          required
          domainValues {
            FieldName
            MaxCaracters
            DomainValues
          }
        }
      }
      properties {
        name
        values
      }
      propertyGroups {
        name
        properties
      }
      recommendations {
        buy {
          productId
          productName
        }
        view {
          productId
          productName
        }
      }
    }
  }
`

const options = {
  options: ({ query = '', category = '', specificationFilters = '', priceRange = '', collection = '', orderBy = '', from = 0, to = 10, salesChannel = '' }) => ({
    variables: {
      query,
      category,
      specificationFilters: specificationFilters?[specificationFilters]:[],
      priceRange,
      collection,
      orderBy,
      from,
      to,
      salesChannel,
    },
  }),
}

export default graphql(query, options)(Shelf)
