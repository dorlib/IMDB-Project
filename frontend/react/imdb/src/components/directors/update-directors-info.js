import React from "react";
import {gql, useMutation} from "@apollo/client";

function UpdateDirectorInfo(props) {

    let UPDATE_DIRECTOR = gql`
        mutation UpdateDirectorDetails ($id: ID!, $bornAt: String!, $profileImage: String!, $description: String!) {
            updateDirectorDetails(id: $id , bornAt: $bornAt, profileImage: $profileImage , description: $description) {
                id
            }
        }
    `;

    let givenId = JSON.stringify(props["id"])
    let givenDescription = JSON.stringify(props["desc"])
    let givenProfile = 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
    let givenBornAt = JSON.stringify(props["birthday"])

    const [mutate, {loading, error}] = useMutation(UPDATE_DIRECTOR, {
        variables: {
            id: givenId || 0,
            description: givenDescription || 'not given yet',
            profileImage: givenProfile || "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif",
            bornAt: givenBornAt || '00.00.0000',
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            {mutate()},{window.location.reload()}
        </div>
    )

}

export default UpdateDirectorInfo;
