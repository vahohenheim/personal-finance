import type { User as NhostUser } from '@nhost/react';

export type User =
	| (Partial<NhostUser> & {
			metadata: { firstName: string; lastName: string };
	  })
	| undefined;
