import { gql } from "@apollo/client";

export const MAIN_CATEGORY = gql`
query MAIN_CATEGORY{
    categories {
    name
    }   
}
`;

export const CURRENCY = gql`
query currency {
    currencies{
        label
        symbol
    }	
}`

export const DETAILED = gql`
query category {
    category {
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
            description
        }
    }
}`