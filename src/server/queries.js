import { gql } from "@apollo/client";

export const MAIN_CATEGORY = gql`
query MAIN_CATEGORY{
    categories {
    name
    }   
}
`;