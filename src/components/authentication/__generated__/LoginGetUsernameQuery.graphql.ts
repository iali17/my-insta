/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LoginGetUsernameQueryVariables = {
    input: string;
};
export type LoginGetUsernameQueryResponse = {
    readonly viewer: {
        readonly user: {
            readonly username: string;
        } | null;
    } | null;
};
export type LoginGetUsernameQuery = {
    readonly response: LoginGetUsernameQueryResponse;
    readonly variables: LoginGetUsernameQueryVariables;
};



/*
query LoginGetUsernameQuery(
  $input: String!
) {
  viewer {
    user(email: $input) {
      username
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginGetUsernameQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginGetUsernameQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "53f3044a8225716fff387f34c2d26550",
    "id": null,
    "metadata": {},
    "name": "LoginGetUsernameQuery",
    "operationKind": "query",
    "text": "query LoginGetUsernameQuery(\n  $input: String!\n) {\n  viewer {\n    user(email: $input) {\n      username\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4821dfe1b2f3ec8c0bac64f526d542ae';
export default node;
