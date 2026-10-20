import {create} from 'zustand'
import {persist} from 'zustand/middleware'

// start / end : positions dans la liste des départements (0 = Ain, 95 = Val-d'Oise)
export const settingsZustand = create (
    persist(
        (set)=> ({
            carte: { start: 0, end: 95 },

            setCarte: (carte) => set({carte}),
        }),
        {
            name: 'settings-zustand',
            version: 1,
        }
    )
)
