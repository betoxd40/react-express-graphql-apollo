import React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Launch from '../Launch';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

const Launches = () => {
    return (
        <>
            <h5 className={'dislay-4 my-5'}>
                Launches
            </h5>
            <Query query={LAUNCHES_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if(loading) return <h4>Loading...</h4>
                        if(error) console.log(error)
                        console.log(data)

                        return <>
                            {
                                data.launches.map(launchItem => 
                                    <Launch
                                        key={launchItem.flight_number}
                                        data={launchItem}
                                    />
                                )
                            }
                        </>
                    }
                }
            </Query>
        </>
    )
}

export default Launches;
