import { Chest, Transaction } from '../gql/graphql';
import { TransactionType } from '../models/transaction';
import { ChestAmounts } from '../models/chest';

export class ChestService {
	public static getChestsSavingAndPicks(chests: Array<Chest>): number {
		return chests.reduce(
			ChestService.aggregateChestsSavingAndPicks.bind(ChestService),
			0
		);
	}

	public static getChestsAmount(chests: Array<Chest>): number {
		return chests.reduce(
			ChestService.aggregateChestsAmount.bind(ChestService),
			0
		);
	}

	public static getChestAmounts(chest: Chest): ChestAmounts {
		return (chest?.transactions || []).reduce(
			ChestService.aggregateTransactionsAmount.bind(ChestService),
			{
				picks: 0,
				savings: 0,
			}
		) as ChestAmounts;
	}

	private static aggregateChestsSavingAndPicks(amount: number, chest: Chest) {
		const chestAmounts = ChestService.getChestAmounts(chest);
		amount = chestAmounts.savings - chestAmounts.picks + amount;
		return amount;
	}

	private static aggregateChestsAmount(amount: number, chest: Chest) {
		amount = (chest?.amount as number) + amount;
		return amount;
	}

	private static aggregateTransactionsAmount(
		amounts: ChestAmounts,
		transaction: Transaction
	): ChestAmounts {
		if (transaction.transaction_type === TransactionType.SAVING) {
			amounts.savings = (transaction.amount as number) + amounts.savings;
		}
		if (transaction.transaction_type === TransactionType.PICK) {
			amounts.picks = (transaction.amount as number) + amounts.picks;
		}
		return amounts;
	}
}
