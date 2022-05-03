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
    let givenDescription = props["desc"]
    let givenProfile = props["prof"]
    let givenBornAt = props["birthday"]

    let currentDescription = props["currentDesc"]
    let currentBornAt = props["currentBornAt"]
    let currentProfilePicture = props["currentProfile"]

    const [mutate, {loading, error}] = useMutation(UPDATE_DIRECTOR, {
        variables: {
            id: givenId || 0,
            description: givenDescription || currentDescription,
            profileImage: givenProfile || currentProfilePicture ,
            bornAt: givenBornAt || currentBornAt,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            {mutate()},{window.location.reload()},{console.log("done")}
        </div>
    )

}

export default UpdateDirectorInfo;
