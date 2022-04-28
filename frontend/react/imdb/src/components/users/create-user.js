// import {gql, useMutation} from "@apollo/client";
// import * as React from "react";
//
// function CreateUser(props) {
//
// //     let NEW_USER = gql`
// //         mutation CreateUser ($firstname: String!, $lastname: String!, $nickname: String!, $description: String!, $password: String!, $profile: String!, $email: String!, $birthday: String! ) {
// //             createUser(firstname: $firstname , lastname: $lastname, nickname: $nickname , description: $description, password: $password, profile: $profile, email: $email, birthday: $birthday) {
// //                 id
// //             }
// //         }
// //     `;
// //
//     console.log("yay")
// //
// //     const [addUser] = useMutation(NEW_USER,
// //         {
// //             variables: {
// //                 firstname: props.userData.FirstName,
// //                 lastname: props.userData.LastName,
// //                 nickname: props.userData.NickName,
// //                 email: props.userData.Email,
// //                 birthday: props.userData.Birthday,
// //                 password: props.userData.Password,
// //                 description: props.userData.Description,
// //                 profile: props.userData.Profile,
// //             },
// //             onCompleted: function (data) {
// //                 return window.location.replace("/userPage/" + data)
// //             },
// //             onError: function (error) {
// //                 console.log("error:", error)
// //             },
// //         });
// //
// //     return (
// //         <div>
// //             {addUser}
// //         </div>
// //     )
// //
// }
// //
// export default CreateUser