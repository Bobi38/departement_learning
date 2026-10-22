import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const settingsZustand = create (
    persist(
        (set)=> ({
            carte: { start: 0, end: 95 },
            mode: 3,

            setCarte: (carte) => set({carte}),
            setMode: (mode) => set({mode})
        }),
        {
            name: 'settings-zustand',
            version: 1.2,
        }
    )
)
