export const formatCurrency = (number: unknown) => {
	return new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR',
	}).format(Number(number));
};
