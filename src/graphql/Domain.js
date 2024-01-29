import { gql } from "@apollo/client";

export const GET_DOMAIN = gql`
    query Domains( $name: String ) {
        domains ( 
            first: 1
            where: {
                name: $name
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

export const GET_MY_DOMAINS = gql`
    query Domains( $owner: String, $now:BigInt ) {
        domains ( 
            orderBy: createdAt
            orderDirection:desc
            where: {
            owner: $owner
            labelName_not:null
            expiryDate_gt: $now
            }
        )
        {
            id
            name
            labelName
            registeredAt
            createdAt
            expiryDate  
        }
    }

`;

export const LATEST_REGISTERED = gql`
    query LatestRegistered {
        domains ( 
            first: 25
            orderBy: createdAt
            orderDirection: desc
            where:  {
                name_not: null
            }
        )
        {
            id
            name
            labelName
            registeredAt
            createdAt
            expiryDate  
        }
    }
`;