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

    let [Mut] = useMutation(UPDATE_DIRECTOR,
        {
            variables: {
                id: props["id"],
                description: props["desc"],
                profile: props["prof"] || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif',
                bornAt: props["birthday"],
            },
            onCompleted: function (data) {
                return window.location.reload();
            },
            onError: function (error) {
                console.log("error:", error)
            },
        });

    return Mut


}

export default UpdateDirectorInfo;
