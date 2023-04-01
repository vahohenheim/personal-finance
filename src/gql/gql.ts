/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n": types.InsertCompanyDocument,
    "\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n": types.GetCompaniesDocument,
    "\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n": types.GetCompanyDocument,
    "\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n": types.InsertTransactionDocument,
    "\n\tquery GetLiteCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n": types.GetLiteCompaniesDocument,
    "\n\tquery GetBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t}\n\t}\n": types.GetBudgetsDocument,
    "\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget {\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n": types.GetTransactionsDocument,
    "\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n": types.GetTransactionDocument,
    "\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetLiteCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetLiteCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget {\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget {\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;