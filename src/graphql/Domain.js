import { gql } from "@apollo/client";

export const GET_DOMAIN = gql`
    query Domains( $labelName: String ) {
        domains ( 
            first: 1
            where: {
                labelName: $labelName
            }
        )
        {
            id
            name
            labelName
            registeredAt
            createdAt
            expiryDate
            registrant {
                id
            }
            owner {
                id
            }
        }
    }
`;