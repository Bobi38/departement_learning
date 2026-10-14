import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const colorZustand = create (
    persist(
        (set)=> ({
            mode: 'dark',

            setMode: (mode) => set({mode}),
        }),
        {
            name: 'color-zustand'
        }
    )
)