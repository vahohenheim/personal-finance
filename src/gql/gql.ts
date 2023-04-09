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
    "\n\tquery GetBudget($id: uuid!) {\n\t\tbudget(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t\tbudget_type {\n\t\t\t\tcolor\n\t\t\t}\n\t\t\tbudget_months {\n\t\t\t\tbudget_id\n\t\t\t\tmonth_id\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tmonth_id\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n": types.GetBudgetDocument,
    "\n\tquery GetMonthBudgets($limit: Int!) {\n\t\tbudget(order_by: { priority: asc }, limit: $limit) {\n\t\t\tbudget_months {\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\tid\n\t\t\tlabel\n\t\t\tpriority\n\t\t\ticon\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tmonth {\n\t\t\t\t\t\t\tstart_at\n\t\t\t\t\t\t\tend_at\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n": types.GetMonthBudgetsDocument,
    "\n\tmutation UpdateBudgetMonth(\n\t\t$budget_id: uuid!\n\t\t$month_id: uuid!\n\t\t$amount: float8!\n\t) {\n\t\tupdate_budget_month_by_pk(\n\t\t\tpk_columns: { budget_id: $budget_id, month_id: $month_id }\n\t\t\t_set: { amount: $amount }\n\t\t) {\n\t\t\tamount\n\t\t}\n\t}\n": types.UpdateBudgetMonthDocument,
    "\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n": types.GetCompaniesDocument,
    "\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n": types.GetCompanyDocument,
    "\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n": types.InsertCompanyDocument,
    "\n\tmutation UpdateCompany($id: uuid!, $label: String!, $logo: String!) {\n\t\tupdate_company_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { label: $label, logo: $logo }\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n": types.UpdateCompanyDocument,
    "\n\tmutation DeleteTransaction($id: uuid!) {\n\t\tdelete_transaction(where: { id: { _eq: $id } }) {\n\t\t\taffected_rows\n\t\t}\n\t}\n": types.DeleteTransactionDocument,
    "\n\tquery GetItemBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t}\n\t}\n": types.GetItemBudgetsDocument,
    "\n\tquery GetItemCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n": types.GetItemCompaniesDocument,
    "\n\tquery GetSettableTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tlabel\n\t\t\tdate\n\t\t\ttransaction_type\n\t\t\tid\n\t\t}\n\t}\n": types.GetSettableTransactionDocument,
    "\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tdate\n\t\t}\n\t}\n": types.GetTransactionDocument,
    "\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t\tbudget_months {\n\t\t\t\t\tamount\n\t\t\t\t\tmonth {\n\t\t\t\t\t\tstart_at\n\t\t\t\t\t\tend_at\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tdate\n\t\t}\n\t}\n": types.GetTransactionsDocument,
    "\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n": types.InsertTransactionDocument,
    "\n\tmutation UpdateTransaction(\n\t\t$id: uuid!\n\t\t$label: String!\n\t\t$amount: float8!\n\t\t$budget_id: uuid!\n\t\t$company_id: uuid!\n\t\t$transaction_type: String!\n\t\t$date: timestamptz!\n\t) {\n\t\tupdate_transaction_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tlabel: $label\n\t\t\t\tamount: $amount\n\t\t\t\tbudget_id: $budget_id\n\t\t\t\tcompany_id: $company_id\n\t\t\t\ttransaction_type: $transaction_type\n\t\t\t\tdate: $date\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\ttransaction_type\n\t\t\tdate\n\t\t}\n\t}\n": types.UpdateTransactionDocument,
    "\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t\tuser_months(where: { current: { _eq: true } }) {\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tmutation UpdateUser(\n\t\t$id: uuid!\n\t\t$displayName: String!\n\t\t$avatarUrl: String!\n\t\t$metadata: jsonb\n\t) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tdisplayName: $displayName\n\t\t\t\tmetadata: $metadata\n\t\t\t\tavatarUrl: $avatarUrl\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tavatarUrl\n\t\t\tmetadata\n\t\t}\n\t}\n": types.UpdateUserDocument,
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
export function graphql(source: "\n\tquery GetBudget($id: uuid!) {\n\t\tbudget(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t\tbudget_type {\n\t\t\t\tcolor\n\t\t\t}\n\t\t\tbudget_months {\n\t\t\t\tbudget_id\n\t\t\t\tmonth_id\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tmonth_id\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetBudget($id: uuid!) {\n\t\tbudget(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t\tbudget_type {\n\t\t\t\tcolor\n\t\t\t}\n\t\t\tbudget_months {\n\t\t\t\tbudget_id\n\t\t\t\tmonth_id\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tmonth_id\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetMonthBudgets($limit: Int!) {\n\t\tbudget(order_by: { priority: asc }, limit: $limit) {\n\t\t\tbudget_months {\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\tid\n\t\t\tlabel\n\t\t\tpriority\n\t\t\ticon\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tmonth {\n\t\t\t\t\t\t\tstart_at\n\t\t\t\t\t\t\tend_at\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetMonthBudgets($limit: Int!) {\n\t\tbudget(order_by: { priority: asc }, limit: $limit) {\n\t\t\tbudget_months {\n\t\t\t\tamount\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t\tend_at\n\t\t\t\t}\n\t\t\t}\n\t\t\tid\n\t\t\tlabel\n\t\t\tpriority\n\t\t\ticon\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tbudget {\n\t\t\t\t\tid\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t\tbudget_months {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tmonth {\n\t\t\t\t\t\t\tstart_at\n\t\t\t\t\t\t\tend_at\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateBudgetMonth(\n\t\t$budget_id: uuid!\n\t\t$month_id: uuid!\n\t\t$amount: float8!\n\t) {\n\t\tupdate_budget_month_by_pk(\n\t\t\tpk_columns: { budget_id: $budget_id, month_id: $month_id }\n\t\t\t_set: { amount: $amount }\n\t\t) {\n\t\t\tamount\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateBudgetMonth(\n\t\t$budget_id: uuid!\n\t\t$month_id: uuid!\n\t\t$amount: float8!\n\t) {\n\t\tupdate_budget_month_by_pk(\n\t\t\tpk_columns: { budget_id: $budget_id, month_id: $month_id }\n\t\t\t_set: { amount: $amount }\n\t\t) {\n\t\t\tamount\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCompanies($limit: Int!) {\n\t\tcompany(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCompany($id: uuid!) {\n\t\tcompany(where: { id: { _eq: $id } }) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t\ttransactions(order_by: { date: desc }) {\n\t\t\t\tamount\n\t\t\t\tcompany {\n\t\t\t\t\tlabel\n\t\t\t\t\tlogo\n\t\t\t\t}\n\t\t\t\tbudget {\n\t\t\t\t\tlabel\n\t\t\t\t\ticon\n\t\t\t\t\tbudget_type {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t\ttransaction_type\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertCompany($company: company_insert_input!) {\n\t\tinsert_company(objects: [$company]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateCompany($id: uuid!, $label: String!, $logo: String!) {\n\t\tupdate_company_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { label: $label, logo: $logo }\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateCompany($id: uuid!, $label: String!, $logo: String!) {\n\t\tupdate_company_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { label: $label, logo: $logo }\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteTransaction($id: uuid!) {\n\t\tdelete_transaction(where: { id: { _eq: $id } }) {\n\t\t\taffected_rows\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteTransaction($id: uuid!) {\n\t\tdelete_transaction(where: { id: { _eq: $id } }) {\n\t\t\taffected_rows\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetItemBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetItemBudgets($limit: Int!) {\n\t\tbudget(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\ticon\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetItemCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetItemCompanies($limit: Int!) {\n\t\tcompany(order_by: { label: asc }, limit: $limit) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tlogo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSettableTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tlabel\n\t\t\tdate\n\t\t\ttransaction_type\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetSettableTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tlabel\n\t\t\tdate\n\t\t\ttransaction_type\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tdate\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTransaction($id: uuid!) {\n\t\ttransaction(where: { id: { _eq: $id } }) {\n\t\t\tamount\n\t\t\tcompany {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tdate\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t\tbudget_months {\n\t\t\t\t\tamount\n\t\t\t\t\tmonth {\n\t\t\t\t\t\tstart_at\n\t\t\t\t\t\tend_at\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tdate\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTransactions($limit: Int!) {\n\t\ttransaction(order_by: { created_at: desc }, limit: $limit) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\tbudget {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\ticon\n\t\t\t\tbudget_type {\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t\tbudget_months {\n\t\t\t\t\tamount\n\t\t\t\t\tmonth {\n\t\t\t\t\t\tstart_at\n\t\t\t\t\t\tend_at\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tcompany {\n\t\t\t\tlabel\n\t\t\t\tlogo\n\t\t\t}\n\t\t\tlabel\n\t\t\ttransaction_type\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t\tdate\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertTransaction($transaction: transaction_insert_input!) {\n\t\tinsert_transaction(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tlabel\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tcompany_id\n\t\t\t\tuser_id\n\t\t\t\ttransaction_type\n\t\t\t\tdate\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateTransaction(\n\t\t$id: uuid!\n\t\t$label: String!\n\t\t$amount: float8!\n\t\t$budget_id: uuid!\n\t\t$company_id: uuid!\n\t\t$transaction_type: String!\n\t\t$date: timestamptz!\n\t) {\n\t\tupdate_transaction_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tlabel: $label\n\t\t\t\tamount: $amount\n\t\t\t\tbudget_id: $budget_id\n\t\t\t\tcompany_id: $company_id\n\t\t\t\ttransaction_type: $transaction_type\n\t\t\t\tdate: $date\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\ttransaction_type\n\t\t\tdate\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateTransaction(\n\t\t$id: uuid!\n\t\t$label: String!\n\t\t$amount: float8!\n\t\t$budget_id: uuid!\n\t\t$company_id: uuid!\n\t\t$transaction_type: String!\n\t\t$date: timestamptz!\n\t) {\n\t\tupdate_transaction_by_pk(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tlabel: $label\n\t\t\t\tamount: $amount\n\t\t\t\tbudget_id: $budget_id\n\t\t\t\tcompany_id: $company_id\n\t\t\t\ttransaction_type: $transaction_type\n\t\t\t\tdate: $date\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tlabel\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tcompany_id\n\t\t\ttransaction_type\n\t\t\tdate\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t\tuser_months(where: { current: { _eq: true } }) {\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser($id: uuid!) {\n\t\tuser(id: $id) {\n\t\t\tid\n\t\t\temail\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t\tavatarUrl\n\t\t\tuser_months(where: { current: { _eq: true } }) {\n\t\t\t\tmonth {\n\t\t\t\t\tstart_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateUser(\n\t\t$id: uuid!\n\t\t$displayName: String!\n\t\t$avatarUrl: String!\n\t\t$metadata: jsonb\n\t) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tdisplayName: $displayName\n\t\t\t\tmetadata: $metadata\n\t\t\t\tavatarUrl: $avatarUrl\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tavatarUrl\n\t\t\tmetadata\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser(\n\t\t$id: uuid!\n\t\t$displayName: String!\n\t\t$avatarUrl: String!\n\t\t$metadata: jsonb\n\t) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: {\n\t\t\t\tdisplayName: $displayName\n\t\t\t\tmetadata: $metadata\n\t\t\t\tavatarUrl: $avatarUrl\n\t\t\t}\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tavatarUrl\n\t\t\tmetadata\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;