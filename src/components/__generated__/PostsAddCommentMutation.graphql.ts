/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CommentInsertType = {
    user: string;
    text?: string | null;
    postId: string;
};
export type PostsAddCommentMutationVariables = {
    input: CommentInsertType;
};
export type PostsAddCommentMutationResponse = {
    readonly insertOneComment: {
        readonly id: string;
        readonly text: string;
        readonly user: string;
    } | null;
};
export type PostsAddCommentMutation = {
    readonly response: PostsAddCommentMutationResponse;
    readonly variables: PostsAddCommentMutationVariables;
};



/*
mutation PostsAddCommentMutation(
  $input: CommentInsertType!
) {
  insertOneComment(input: $input) {
    id
    text
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
    "concreteType": "Comment",
    "kind": "LinkedField",
    "name": "insertOneComment",
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
        "name": "text",
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
    "name": "PostsAddCommentMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostsAddCommentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "123ec0117e6af37b63131ef2c9556df5",
    "id": null,
    "metadata": {},
    "name": "PostsAddCommentMutation",
    "operationKind": "mutation",
    "text": "mutation PostsAddCommentMutation(\n  $input: CommentInsertType!\n) {\n  insertOneComment(input: $input) {\n    id\n    text\n    user\n  }\n}\n"
  }
};
})();
(node as any).hash = '239c531836d769074ebbae715fc3b11d';
export default node;
