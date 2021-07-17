/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PostInsertType = {
    user: string;
    image_url: string;
    description: string;
};
export type NewPostScreenAddMutationVariables = {
    input: PostInsertType;
};
export type NewPostScreenAddMutationResponse = {
    readonly newPost: {
        readonly id: string;
        readonly image_url: string;
        readonly description: string | null;
        readonly user: string;
    } | null;
};
export type NewPostScreenAddMutation = {
    readonly response: NewPostScreenAddMutationResponse;
    readonly variables: NewPostScreenAddMutationVariables;
};



/*
mutation NewPostScreenAddMutation(
  $input: PostInsertType!
) {
  newPost(input: $input) {
    id
    image_url
    description
    user
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "newPost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image_url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "user",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewPostScreenAddMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewPostScreenAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f23d749f0ebc08bf4457b02330de8253",
    "id": null,
    "metadata": {},
    "name": "NewPostScreenAddMutation",
    "operationKind": "mutation",
    "text": "mutation NewPostScreenAddMutation(\n  $input: PostInsertType!\n) {\n  newPost(input: $input) {\n    id\n    image_url\n    description\n    user\n  }\n}\n"
  }
};
})();
(node as any).hash = 'aead9334c8f4c6dbb4a70442889cc341';
export default node;
