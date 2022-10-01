import { gql } from "@apollo/client";

export const MAIN_CATEGORY = gql`
query MAIN_CATEGORY{
    categories {
    name
    }   
}
`;

export const ITEM_LIST_QUERY = gql`
query category {
    category {
        products {
            id
            brand
            name
            inStock
            category
            gallery
            prices {
                currency {
                    symbol
                }
                amount
            }
        }
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