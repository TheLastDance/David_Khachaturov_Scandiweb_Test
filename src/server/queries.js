import { gql } from "@apollo/client";

export const MAIN_CATEGORY = gql`
query MAIN_CATEGORY{
    categories {
    name
    }   
}
`

export const CURRENCY = gql`
query currency {
    currencies{
        label
        symbol
    }	
}`

export const CATEGORY = gql`
query product($input: CategoryInput) {
    category(input: $input){
        name
        products {
            id
            brand
            name
            inStock
            gallery
            category
            attributes {
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                    symbol
                }
            amount
            }
        }
    }     
}`

export const PRODUCT = gql`
query product($id: String!) {
    product(id: $id){
            id
            brand
            name
            inStock
            gallery
            category
            attributes {
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                symbol
            }
            amount
            }
            description 
    }     
}
`
