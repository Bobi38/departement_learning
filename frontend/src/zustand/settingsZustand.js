import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const settingsZustand = create (
    persist(
        (set)=> ({
            carte: { start: 0, end: 95 },
            mode: 3,
            lastgame: [],

            setCarte: (carte) => set({carte, lastgame: []}),
            setMode: (mode) => set({mode}),
            addGame: (game) => set((state) =>
            {
                const lastgame = [...state.lastgame]
                lastgame.push(game)
                return { lastgame: lastgame.slice(-7) }
            }),
            cleanGame: () => set({ lastgame: [] })
        }),
        {
            name: 'settings-zustand',
            version: 1.2,
        }
    )
)
