import type { User as NhostUser } from '@nhost/react'

export type User = Partial<NhostUser> | undefined;